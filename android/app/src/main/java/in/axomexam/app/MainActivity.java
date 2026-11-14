package in.axomexam.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.TranslateAnimation;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

/**
 * Single-activity WebView shell for axomexam.in.
 *
 * Study content is served by the website, so the app owns only what a browser
 * cannot provide: native chrome (header, bottom navigation, drawer), an
 * onboarding flow, offline and loading screens, file downloads and app links.
 * It also compacts the site hero for a phone-sized screen and keeps the
 * site's own theme and language preferences in sync with the drawer.
 */
public class MainActivity extends Activity {

  private static final String HOME_URL = "https://axomexam.in/";
  private static final String APP_HOST = "axomexam.in";
  private static final int REQ_FILE_CHOOSER = 4001;
  private static final String STATE_URL = "axo_url";
  private static final String PREFS = "axo_prefs";
  private static final String KEY_ONBOARDED = "onboarded";
  private static final String KEY_THEME = "theme";
  private static final String KEY_LANG = "lang";

  private WebView web;
  private SwipeRefreshLayout swipe;
  private ProgressBar progress;
  private View offlineView;
  private View loadingView;
  private TextView loadingText;
  private View drawerOverlay;
  private View drawerPanel;
  private View onboardView;
  private LinearLayout drawerItems;

  private ValueCallback<Uri[]> fileCallback;
  private SharedPreferences prefs;
  private boolean pageFailed = false;
  private boolean firstLoadDone = false;
  private long lastBackPress = 0L;

  private final Handler ui = new Handler(Looper.getMainLooper());
  private final Runnable slowHint = () -> {
    if (loadingView.getVisibility() == View.VISIBLE) {
      loadingText.setText(R.string.loading_slow);
    }
  };

  /**
   * The app ships a light palette by default. Pinning the configuration to
   * "not night" keeps the native chrome light even when the phone is in system
   * dark mode; the user can still switch to dark from the drawer, which is then
   * applied to the web content.
   */
  @Override
  protected void attachBaseContext(Context base) {
    Configuration cfg = new Configuration(base.getResources().getConfiguration());
    cfg.uiMode = (cfg.uiMode & ~Configuration.UI_MODE_NIGHT_MASK)
        | Configuration.UI_MODE_NIGHT_NO;
    super.attachBaseContext(base.createConfigurationContext(cfg));
  }

  @SuppressLint("SetJavaScriptEnabled")
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    prefs = getSharedPreferences(PREFS, Context.MODE_PRIVATE);

    web = findViewById(R.id.webview);
    swipe = findViewById(R.id.swipe);
    progress = findViewById(R.id.progress);
    offlineView = findViewById(R.id.offline);
    loadingView = findViewById(R.id.loading);
    loadingText = findViewById(R.id.loading_text);
    drawerOverlay = findViewById(R.id.drawer_overlay);
    drawerPanel = findViewById(R.id.drawer_panel);
    onboardView = findViewById(R.id.onboard);
    drawerItems = findViewById(R.id.drawer_items);

    configureWebView();
    configureChrome();
    buildDrawer();

    String version = "";
    try {
      version = getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
    } catch (Exception ignored) {
    }
    ((TextView) findViewById(R.id.drawer_version))
        .setText(getString(R.string.version_label, version));

    if (savedInstanceState != null && savedInstanceState.getString(STATE_URL) != null) {
      web.loadUrl(savedInstanceState.getString(STATE_URL));
    } else if (prefs.getBoolean(KEY_ONBOARDED, false)) {
      web.loadUrl(HOME_URL);
    } else {
      showOnboarding();
    }

    // The themed window background covers the gap before the first paint, so
    // the WebView itself can stay hidden until the first frame is ready.
    swipe.setAlpha(0f);
  }

  @Override
  protected void onSaveInstanceState(@NonNull Bundle out) {
    super.onSaveInstanceState(out);
    if (web.getUrl() != null) {
      out.putString(STATE_URL, web.getUrl());
    }
  }

  /* ============================ WebView ============================ */

  @SuppressLint("SetJavaScriptEnabled")
  private void configureWebView() {
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setDatabaseEnabled(true);
    s.setLoadWithOverviewMode(true);
    s.setUseWideViewPort(true);
    s.setSupportZoom(false);
    s.setBuiltInZoomControls(false);
    s.setAllowFileAccess(false);
    s.setAllowContentAccess(true);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setCacheMode(WebSettings.LOAD_DEFAULT);
    s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
    s.setTextZoom(100);

    web.setBackgroundColor(ContextCompat.getColor(this, R.color.bg));
    web.setOverScrollMode(View.OVER_SCROLL_NEVER);
    web.addJavascriptInterface(new AppBridge(), "AxomexamApp");

    CookieManager.getInstance().setAcceptCookie(true);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      CookieManager.getInstance().setAcceptThirdPartyCookies(web, true);
    }

    web.setWebViewClient(new WebViewClient() {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        return handleUrl(request.getUrl().toString());
      }

      @Override
      @SuppressWarnings("deprecation")
      public boolean shouldOverrideUrlLoading(WebView view, String url) {
        return handleUrl(url);
      }

      @Override
      public void onPageStarted(WebView view, String url, Bitmap favicon) {
        pageFailed = false;
        if (!firstLoadDone) {
          loadingView.setVisibility(View.VISIBLE);
          loadingText.setText(R.string.loading_connecting);
          ui.postDelayed(slowHint, 4000);
        }
        if (isHome(url)) {
          progress.setVisibility(View.VISIBLE);
          progress.setProgress(0);
        }
      }

      @Override
      public void onPageFinished(WebView view, String url) {
        ui.removeCallbacks(slowHint);
        progress.setVisibility(View.GONE);
        loadingView.setVisibility(View.GONE);
        swipe.setRefreshing(false);
        if (!firstLoadDone) {
          firstLoadDone = true;
          fadeIn(swipe);
        }
        if (!pageFailed) {
          offlineView.setVisibility(View.GONE);
        }
        injectAppChrome();
        syncNavSelection(url);
      }

      @Override
      public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        if (request.isForMainFrame()) {
          pageFailed = true;
          showOffline();
        }
      }

      @Override
      @SuppressWarnings("deprecation")
      public void onReceivedError(WebView view, int code, String desc, String url) {
        pageFailed = true;
        showOffline();
      }

      @Override
      public void onReceivedHttpError(WebView view, WebResourceRequest request,
                                      WebResourceResponse response) {
        // A 404 inside the site is a page-level concern; only a failed
        // document request should replace the screen.
        if (request.isForMainFrame() && response.getStatusCode() >= 500) {
          pageFailed = true;
          showOffline();
        }
      }
    });

    web.setWebChromeClient(new WebChromeClient() {
      @Override
      public void onProgressChanged(WebView view, int newProgress) {
        if (newProgress < 100 && isHome(view.getUrl())) {
          progress.setVisibility(View.VISIBLE);
        }
        progress.setProgress(newProgress);
        if (newProgress >= 100) {
          progress.setVisibility(View.GONE);
        }
        if (!firstLoadDone && newProgress > 35) {
          loadingText.setText(R.string.loading_loading);
        }
      }

      @Override
      public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> cb,
                                       FileChooserParams params) {
        if (fileCallback != null) {
          fileCallback.onReceiveValue(null);
        }
        fileCallback = cb;
        try {
          startActivityForResult(params.createIntent(), REQ_FILE_CHOOSER);
          return true;
        } catch (ActivityNotFoundException e) {
          fileCallback = null;
          toast(getString(R.string.toast_no_app));
          return false;
        }
      }
    });

    web.setDownloadListener(new DownloadListener() {
      @Override
      public void onDownloadStart(String url, String userAgent, String contentDisposition,
                                  String mimeType, long contentLength) {
        startDownload(url, userAgent, contentDisposition, mimeType);
      }
    });

    ((AppWebView) web).setScrollListener(scrollY ->
        findViewById(R.id.scroll_top)
            .setVisibility(scrollY > 700 ? View.VISIBLE : View.GONE));
  }

  /** Routes external schemes to their apps and keeps site URLs in the WebView. */
  private boolean handleUrl(String url) {
    if (url == null) {
      return false;
    }
    Uri uri = Uri.parse(url);
    String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
    String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();

    boolean internal = ("http".equals(scheme) || "https".equals(scheme))
        && (host.equals(APP_HOST) || host.equals("www." + APP_HOST));
    if (internal) {
      return false;
    }
    openExternally(uri);
    return true;
  }

  private void openExternally(Uri uri) {
    try {
      Intent i = new Intent(Intent.ACTION_VIEW, uri);
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      startActivity(i);
    } catch (ActivityNotFoundException e) {
      toast(getString(R.string.toast_no_app));
    } catch (Exception e) {
      toast(getString(R.string.toast_unable_open));
    }
  }

  private void startDownload(String url, String userAgent, String disposition, String mime) {
    if (url.startsWith("blob:") || url.startsWith("data:")) {
      openExternally(Uri.parse(url));
      return;
    }
    try {
      String name = URLUtil.guessFileName(url, disposition, mime);
      DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
      req.setMimeType(mime);
      req.addRequestHeader("User-Agent", userAgent);
      req.setTitle(name);
      req.setDescription(getString(R.string.app_name));
      req.setNotificationVisibility(
          DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
      req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, name);
      DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
      if (dm != null) {
        dm.enqueue(req);
        toast(getString(R.string.toast_download_started, name));
      }
    } catch (Exception e) {
      openExternally(Uri.parse(url));
      toast(getString(R.string.toast_download_failed));
    }
  }

  /* ============================ chrome ============================ */

  private void configureChrome() {
    swipe.setColorSchemeColors(ContextCompat.getColor(this, R.color.brand));
    swipe.setProgressBackgroundColorSchemeColor(ContextCompat.getColor(this, R.color.card));
    swipe.setOnRefreshListener(() -> {
      pageFailed = false;
      web.reload();
    });

    findViewById(R.id.offline_retry).setOnClickListener(v -> {
      if (isOnline()) {
        offlineView.setVisibility(View.GONE);
        web.reload();
      } else {
        toast(getString(R.string.offline_still));
      }
    });

    findViewById(R.id.drawer_close).setOnClickListener(v -> closeDrawer());
    findViewById(R.id.drawer_scrim).setOnClickListener(v -> closeDrawer());

    findViewById(R.id.scroll_top).setOnClickListener(v ->
        web.evaluateJavascript("window.scrollTo({top:0,behavior:'smooth'})", null));

    findViewById(R.id.nav_home).setOnClickListener(v -> go(HOME_URL));
    findViewById(R.id.nav_mock).setOnClickListener(v -> go(HOME_URL + "mock-test/"));
    findViewById(R.id.nav_practice).setOnClickListener(v -> go(HOME_URL + "categories/"));
    findViewById(R.id.nav_search).setOnClickListener(v -> go(HOME_URL + "search/"));
    findViewById(R.id.nav_menu).setOnClickListener(v -> openDrawer());
  }

  private void go(String url) {
    closeDrawer();
    if (url.equals(web.getUrl())) {
      web.reload();
    } else {
      web.loadUrl(url);
    }
  }

  /* ============================ drawer ============================ */

  private void buildDrawer() {
    addSection(R.string.sec_study);
    addRow(R.drawable.ic_home, R.string.menu_home, HOME_URL);
    addRow(R.drawable.ic_mock, R.string.menu_mock, HOME_URL + "mock-test/");
    addRow(R.drawable.ic_practice, R.string.menu_practice, HOME_URL + "categories/");
    addRow(R.drawable.ic_exam, R.string.menu_pyq, HOME_URL + "previous-year/");
    addRow(R.drawable.ic_ebook, R.string.menu_ebooks, HOME_URL + "ebooks/");
    addRow(R.drawable.ic_pdf, R.string.menu_downloads, HOME_URL + "downloads/");
    addRow(R.drawable.ic_news, R.string.menu_ca, HOME_URL + "current-affairs/");
    addRow(R.drawable.ic_trending, R.string.menu_trending, HOME_URL + "trending/");
    addRow(R.drawable.ic_layers, R.string.menu_exams, HOME_URL + "exams/");

    addSection(R.string.sec_app);
    addRow(R.drawable.ic_question, R.string.menu_howto, this::showOnboarding);
    addRow(R.drawable.ic_moon, R.string.menu_theme, this::toggleTheme);
    addRow(R.drawable.ic_globe, R.string.menu_language, this::toggleLanguage);
    addRow(R.drawable.ic_share, R.string.menu_share, this::shareApp);
    addRow(R.drawable.ic_browser, R.string.menu_browser,
        () -> openExternally(Uri.parse(web.getUrl() == null ? HOME_URL : web.getUrl())));
    addRow(R.drawable.ic_trash, R.string.menu_clear, this::clearCache);
    addRow(R.drawable.ic_refresh, R.string.menu_refresh, () -> {
      closeDrawer();
      web.reload();
    });

    addSection(R.string.sec_info);
    addRow(R.drawable.ic_info, R.string.menu_about, HOME_URL + "about/");
    addRow(R.drawable.ic_contact, R.string.menu_contact, HOME_URL + "contact/");
    addRow(R.drawable.ic_shield, R.string.menu_privacy, HOME_URL + "privacy/");
    addRow(R.drawable.ic_star, R.string.menu_terms, HOME_URL + "terms/");
    addRow(R.drawable.ic_info, R.string.menu_disclaimer, HOME_URL + "disclaimer/");
  }

  private void addSection(int titleRes) {
    TextView tv = new TextView(this);
    tv.setText(titleRes);
    tv.setLayoutParams(new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    tv.setPadding(dp(16), dp(14), dp(16), dp(5));
    tv.setTextColor(ContextCompat.getColor(this, R.color.ink_soft));
    tv.setTextSize(10.5f);
    tv.setTypeface(tv.getTypeface(), Typeface.BOLD);
    tv.setLetterSpacing(0.08f);
    drawerItems.addView(tv);
  }

  private void addRow(int iconRes, int labelRes, String url) {
    addRow(iconRes, labelRes, () -> go(url));
  }

  private void addRow(int iconRes, int labelRes, Runnable action) {
    LinearLayout row = new LinearLayout(this);
    row.setOrientation(LinearLayout.HORIZONTAL);
    row.setGravity(Gravity.CENTER_VERTICAL);
    row.setClickable(true);
    row.setFocusable(true);
    row.setBackgroundResource(selectableItemBackground());
    row.setPadding(dp(16), dp(11), dp(14), dp(11));
    row.setLayoutParams(new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

    ImageView icon = new ImageView(this);
    int size = dp(21);
    icon.setLayoutParams(new LinearLayout.LayoutParams(size, size));
    icon.setImageResource(iconRes);
    icon.setColorFilter(ContextCompat.getColor(this, R.color.ink_soft));
    row.addView(icon);

    TextView label = new TextView(this);
    LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
        0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
    lp.setMarginStart(dp(14));
    label.setLayoutParams(lp);
    label.setText(labelRes);
    label.setTextColor(ContextCompat.getColor(this, R.color.ink));
    label.setTextSize(14f);
    row.addView(label);

    ImageView chevron = new ImageView(this);
    int cs = dp(15);
    chevron.setLayoutParams(new LinearLayout.LayoutParams(cs, cs));
    chevron.setImageResource(R.drawable.ic_chevron);
    chevron.setColorFilter(ContextCompat.getColor(this, R.color.ink_soft));
    row.addView(chevron);

    row.setOnClickListener(v -> action.run());
    drawerItems.addView(row);
  }

  private int selectableItemBackground() {
    TypedValue tv = new TypedValue();
    getTheme().resolveAttribute(android.R.attr.selectableItemBackground, tv, true);
    return tv.resourceId;
  }

  private void openDrawer() {
    drawerOverlay.setVisibility(View.VISIBLE);
    drawerPanel.post(() -> {
      TranslateAnimation slide = new TranslateAnimation(-drawerPanel.getWidth(), 0, 0, 0);
      slide.setDuration(230);
      slide.setInterpolator(new DecelerateInterpolator());
      drawerPanel.startAnimation(slide);
    });
  }

  private void closeDrawer() {
    if (drawerOverlay.getVisibility() != View.VISIBLE) {
      return;
    }
    TranslateAnimation slide = new TranslateAnimation(0, -drawerPanel.getWidth(), 0, 0);
    slide.setDuration(200);
    slide.setInterpolator(new DecelerateInterpolator());
    slide.setAnimationListener(new Animation.AnimationListener() {
      public void onAnimationStart(Animation a) {
      }

      public void onAnimationRepeat(Animation a) {
      }

      public void onAnimationEnd(Animation a) {
        drawerPanel.clearAnimation();
        drawerOverlay.setVisibility(View.GONE);
      }
    });
    drawerPanel.startAnimation(slide);
  }

  /* ============================ theme + language ============================ */

  private boolean isDark() {
    // Light is the default: the phone's system setting does not flip the app.
    return "dark".equals(prefs.getString(KEY_THEME, "light"));
  }

  private void toggleTheme() {
    closeDrawer();
    boolean dark = !isDark();
    prefs.edit().putString(KEY_THEME, dark ? "dark" : "light").apply();
    // The site owns its own palette; writing its storage key keeps the web
    // content and the native chrome in step without a reload.
    web.evaluateJavascript(
        "(function(){try{localStorage.setItem('axomexam-theme','" + (dark ? "dark" : "light")
            + "');var h=document.documentElement;"
            + (dark ? "h.setAttribute('data-theme','dark');" : "h.removeAttribute('data-theme');")
            + "}catch(e){}})();", null);
  }

  private String currentLang() {
    return prefs.getString(KEY_LANG, "en");
  }

  private void toggleLanguage() {
    closeDrawer();
    final String next = "en".equals(currentLang()) ? "as" : "en";
    prefs.edit().putString(KEY_LANG, next).apply();
    // The site reads this key on boot and re-renders its navigation, so a
    // reload is the reliable way to apply the switch everywhere.
    web.evaluateJavascript(
        "(function(){try{localStorage.setItem('axomexam-ui-lang','" + next + "');}catch(e){}})();",
        value -> web.reload());
  }

  /* ============================ actions ============================ */

  private void shareApp() {
    closeDrawer();
    Intent i = new Intent(Intent.ACTION_SEND);
    i.setType("text/plain");
    i.putExtra(Intent.EXTRA_SUBJECT, getString(R.string.app_name));
    i.putExtra(Intent.EXTRA_TEXT, getString(R.string.toast_share_text));
    try {
      startActivity(Intent.createChooser(i, getString(R.string.menu_share)));
    } catch (Exception e) {
      toast(getString(R.string.toast_no_app));
    }
  }

  private void clearCache() {
    closeDrawer();
    web.clearCache(true);
    web.clearHistory();
    CookieManager.getInstance().flush();
    toast(getString(R.string.toast_cache_cleared));
  }

  private boolean isOnline() {
    ConnectivityManager cm =
        (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
    if (cm == null) {
      return true;
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      NetworkCapabilities nc = cm.getNetworkCapabilities(cm.getActiveNetwork());
      return nc != null && nc.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
    }
    NetworkInfo ni = cm.getActiveNetworkInfo();
    return ni != null && ni.isConnected();
  }

  private void showOffline() {
    ui.removeCallbacks(slowHint);
    loadingView.setVisibility(View.GONE);
    progress.setVisibility(View.GONE);
    swipe.setRefreshing(false);
    if (!firstLoadDone) {
      firstLoadDone = true;
      swipe.setAlpha(1f);
    }
    offlineView.setVisibility(View.VISIBLE);
  }

  private static boolean isHome(String url) {
    return url != null
        && (url.equals(HOME_URL) || url.equals(HOME_URL.substring(0, HOME_URL.length() - 1)));
  }

  private void toast(String msg) {
    Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
  }

  private int dp(int v) {
    return Math.round(v * getResources().getDisplayMetrics().density);
  }

  private void fadeIn(View v) {
    AlphaAnimation a = new AlphaAnimation(0f, 1f);
    a.setDuration(220);
    a.setInterpolator(new AccelerateDecelerateInterpolator());
    v.startAnimation(a);
    v.setAlpha(1f);
  }

  /* ============================ onboarding ============================ */

  private void showOnboarding() {
    onboardView.setVisibility(View.VISIBLE);
    fadeIn(onboardView);
    renderStep(0);
  }

  private void renderStep(int step) {
    LinearLayout dots = findViewById(R.id.ob_dots);
    LinearLayout content = findViewById(R.id.ob_content);
    LinearLayout actions = findViewById(R.id.ob_actions);
    ImageView icon = findViewById(R.id.ob_icon);
    TextView title = findViewById(R.id.ob_title);
    TextView body = findViewById(R.id.ob_body);

    dots.removeAllViews();
    content.removeAllViews();
    actions.removeAllViews();

    final int total = 5;
    for (int i = 0; i < total; i++) {
      View dot = new View(this);
      int w = i == step ? dp(22) : dp(7);
      LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(w, dp(7));
      p.setMarginEnd(dp(6));
      dot.setLayoutParams(p);
      dot.setBackgroundResource(i == step ? R.drawable.step_dot_on : R.drawable.step_dot);
      dots.addView(dot);
    }

    switch (step) {
      case 0:
        icon.setImageResource(R.drawable.ic_star);
        title.setText(R.string.ob1_title);
        body.setText(R.string.ob1_body);
        addPills(content, new int[]{R.string.quick_mock, R.string.quick_practice,
            R.string.quick_notes, R.string.quick_ebooks});
        break;
      case 1:
        icon.setImageResource(R.drawable.ic_layers);
        title.setText(R.string.ob2_title);
        body.setText(R.string.ob2_body);
        addFeature(content, R.drawable.ic_mock, R.string.ob2_f1t, R.string.ob2_f1d);
        addFeature(content, R.drawable.ic_globe, R.string.ob2_f2t, R.string.ob2_f2d);
        addFeature(content, R.drawable.ic_pdf, R.string.ob2_f3t, R.string.ob2_f3d);
        addFeature(content, R.drawable.ic_home, R.string.ob2_f4t, R.string.ob2_f4d);
        break;
      case 2:
        icon.setImageResource(R.drawable.ic_question);
        title.setText(R.string.ob3_title);
        body.setText(R.string.ob3_body);
        addStepRow(content, 1, R.string.ob3_s1);
        addStepRow(content, 2, R.string.ob3_s2);
        addStepRow(content, 3, R.string.ob3_s3);
        addStepRow(content, 4, R.string.ob3_s4);
        addStepRow(content, 5, R.string.ob3_s5);
        addStepRow(content, 6, R.string.ob3_s6);
        break;
      case 3:
        icon.setImageResource(R.drawable.ic_shield);
        title.setText(R.string.ob4_title);
        body.setText(R.string.ob4_body);
        addTerms(content, new int[]{R.string.ob4_t1, R.string.ob4_t2, R.string.ob4_t3,
            R.string.ob4_t4, R.string.ob4_t5});
        break;
      default:
        icon.setImageResource(R.drawable.ic_check);
        title.setText(R.string.ob5_title);
        body.setText(R.string.ob5_body);
        break;
    }

    if (step < total - 1) {
      actions.addView(primaryButton(R.string.ob_next, () -> renderStep(step + 1)));
      if (step > 0) {
        actions.addView(ghostButton(R.string.ob_back, () -> renderStep(step - 1)));
      }
    } else {
      actions.addView(primaryButton(R.string.ob_start, this::finishOnboarding));
      actions.addView(ghostButton(R.string.ob_back, () -> renderStep(step - 1)));
    }
  }

  private void finishOnboarding() {
    prefs.edit().putBoolean(KEY_ONBOARDED, true).apply();
    onboardView.setVisibility(View.GONE);
    if (web.getUrl() == null) {
      web.loadUrl(HOME_URL);
    }
  }

  private Button primaryButton(int textRes, Runnable action) {
    Button b = new Button(this);
    b.setText(textRes);
    b.setAllCaps(false);
    b.setTextColor(Color.WHITE);
    b.setTextSize(14.5f);
    b.setTypeface(b.getTypeface(), Typeface.BOLD);
    b.setBackgroundResource(R.drawable.btn_primary);
    b.setPadding(dp(18), dp(12), dp(18), dp(12));
    LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    p.topMargin = dp(7);
    b.setLayoutParams(p);
    b.setOnClickListener(v -> action.run());
    return b;
  }

  private Button ghostButton(int textRes, Runnable action) {
    Button b = new Button(this);
    b.setText(textRes);
    b.setAllCaps(false);
    b.setTextColor(ContextCompat.getColor(this, R.color.ink));
    b.setTextSize(13.5f);
    b.setBackgroundResource(R.drawable.btn_ghost);
    b.setPadding(dp(18), dp(11), dp(18), dp(11));
    LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    p.topMargin = dp(7);
    b.setLayoutParams(p);
    b.setOnClickListener(v -> action.run());
    return b;
  }

  private void addPills(LinearLayout parent, int[] labels) {
    LinearLayout wrap = new LinearLayout(this);
    wrap.setOrientation(LinearLayout.HORIZONTAL);
    wrap.setGravity(Gravity.CENTER);
    wrap.setLayoutParams(new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    for (int res : labels) {
      TextView tv = new TextView(this);
      tv.setText(res);
      tv.setTextSize(11f);
      tv.setTypeface(tv.getTypeface(), Typeface.BOLD);
      tv.setTextColor(ContextCompat.getColor(this, R.color.brand));
      GradientDrawable bg = new GradientDrawable();
      bg.setColor(ContextCompat.getColor(this, R.color.brand_soft));
      bg.setCornerRadius(dp(99));
      tv.setBackground(bg);
      tv.setPadding(dp(11), dp(5), dp(11), dp(5));
      LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
          ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
      p.setMarginEnd(dp(6));
      tv.setLayoutParams(p);
      wrap.addView(tv);
    }
    parent.addView(wrap);
  }

  private void addFeature(LinearLayout parent, int iconRes, int titleRes, int bodyRes) {
    LinearLayout row = new LinearLayout(this);
    row.setOrientation(LinearLayout.HORIZONTAL);
    row.setGravity(Gravity.TOP);
    row.setBackgroundResource(R.drawable.card_bg);
    row.setPadding(dp(11), dp(11), dp(11), dp(11));
    LinearLayout.LayoutParams rp = new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    rp.bottomMargin = dp(9);
    row.setLayoutParams(rp);

    ImageView ic = new ImageView(this);
    int box = dp(36);
    ic.setLayoutParams(new LinearLayout.LayoutParams(box, box));
    ic.setPadding(dp(8), dp(8), dp(8), dp(8));
    ic.setImageResource(iconRes);
    ic.setColorFilter(ContextCompat.getColor(this, R.color.brand));
    GradientDrawable tile = new GradientDrawable();
    tile.setColor(ContextCompat.getColor(this, R.color.brand_soft));
    tile.setCornerRadius(dp(11));
    ic.setBackground(tile);
    row.addView(ic);

    LinearLayout text = new LinearLayout(this);
    text.setOrientation(LinearLayout.VERTICAL);
    LinearLayout.LayoutParams tp = new LinearLayout.LayoutParams(
        0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
    tp.setMarginStart(dp(12));
    text.setLayoutParams(tp);

    TextView t = new TextView(this);
    t.setText(titleRes);
    t.setTextSize(13.5f);
    t.setTypeface(t.getTypeface(), Typeface.BOLD);
    t.setTextColor(ContextCompat.getColor(this, R.color.ink));
    text.addView(t);

    TextView d = new TextView(this);
    d.setText(bodyRes);
    d.setTextSize(12f);
    d.setTextColor(ContextCompat.getColor(this, R.color.ink_soft));
    text.addView(d);

    row.addView(text);
    parent.addView(row);
  }

  private void addStepRow(LinearLayout parent, int number, int textRes) {
    LinearLayout row = new LinearLayout(this);
    row.setOrientation(LinearLayout.HORIZONTAL);
    row.setGravity(Gravity.TOP);
    LinearLayout.LayoutParams rp = new LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    rp.bottomMargin = dp(10);
    row.setLayoutParams(rp);

    TextView n = new TextView(this);
    n.setText(String.valueOf(number));
    n.setTextSize(12f);
    n.setTypeface(n.getTypeface(), Typeface.BOLD);
    n.setTextColor(Color.WHITE);
    n.setGravity(Gravity.CENTER);
    int box = dp(24);
    n.setLayoutParams(new LinearLayout.LayoutParams(box, box));
    GradientDrawable circle = new GradientDrawable();
    circle.setShape(GradientDrawable.OVAL);
    circle.setColor(ContextCompat.getColor(this, R.color.brand));
    n.setBackground(circle);
    row.addView(n);

    TextView t = new TextView(this);
    t.setText(textRes);
    t.setTextSize(12.5f);
    t.setTextColor(ContextCompat.getColor(this, R.color.ink_soft));
    LinearLayout.LayoutParams tp = new LinearLayout.LayoutParams(
        0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
    tp.setMarginStart(dp(11));
    t.setLayoutParams(tp);
    row.addView(t);

    parent.addView(row);
  }

  private void addTerms(LinearLayout parent, int[] lines) {
    for (int res : lines) {
      TextView t = new TextView(this);
      t.setText(res);
      t.setTextSize(12.5f);
      t.setTextColor(ContextCompat.getColor(this, R.color.ink_soft));
      t.setLineSpacing(dp(2), 1f);
      LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
      p.bottomMargin = dp(10);
      t.setLayoutParams(p);
      parent.addView(t);
    }
  }

  /* ============================ injected chrome ============================ */

  private void injectAppChrome() {
    web.evaluateJavascript(APP_CSS_JS, null);
  }

  /**
   * Marks the document as running inside the app, swaps the site's large hero
   * for a compact bilingual welcome banner, and suppresses the site's own
   * bottom tab bar and install prompt, since the app supplies those natively.
   * Everything is scoped to the marker class or a separate style tag, so the
   * browser build is untouched. The site routes with pushState and re-renders
   * #app asynchronously, so this also re-runs on route changes and on DOM
   * mutations rather than only on first paint.
   */
  private static final String APP_CSS_JS = """
      (function () {
        try {
          var root = document.documentElement;
          if (!root.classList.contains('axo-app')) root.classList.add('axo-app');

          var CSS = [
            '.tabbar{display:none !important}',
            '.app-prompt{display:none !important}',
            'body{padding-bottom:0 !important}',
            '.axo-app #app > .hero{display:none !important}',
            '.axo-app .axo-banner{margin:14px 0 4px;padding:16px 16px 15px;border-radius:16px;color:#fff;',
            'background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#22d3ee 130%);',
            'box-shadow:0 10px 26px -14px rgba(79,70,229,.6)}',
            '.axo-app .axo-banner-kicker{display:inline-block;font-size:10px;font-weight:800;',
            'letter-spacing:.9px;text-transform:uppercase;background:rgba(255,255,255,.18);',
            'border:1px solid rgba(255,255,255,.28);padding:3px 9px;border-radius:99px;margin-bottom:9px}',
            '.axo-app .axo-banner h2{margin:0 0 7px;font-size:19px;line-height:1.2;font-weight:800;color:#fff}',
            '.axo-app .axo-banner p{margin:0 0 6px;line-height:1.45;color:rgba(255,255,255,.94)}',
            '.axo-app .axo-banner p:last-of-type{margin-bottom:0}',
            '.axo-app .axo-banner-as{font-size:12.5px}',
            '.axo-app .axo-banner-en{font-size:12px;opacity:.92}',
            '.axo-app .axo-banner-stats{display:flex;gap:7px;margin-top:12px}',
            '.axo-app .axo-banner-stats div{flex:1 1 0;min-width:0;background:rgba(255,255,255,.14);',
            'border:1px solid rgba(255,255,255,.22);border-radius:12px;padding:8px 9px;text-align:center}',
            '.axo-app .axo-banner-stats b{display:block;font-size:14.5px;line-height:1.15}',
            '.axo-app .axo-banner-stats span{display:block;font-size:9.5px;opacity:.9;margin-top:2px}',
            '.axo-app .axo-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}',
            '.axo-app .axo-chips i{font-style:normal;font-size:9.5px;font-weight:700;padding:4px 9px;',
            'border-radius:99px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.26)}',
            // The site footer is a near-black navy; a blue footer ties it to the
            // app's brand and keeps the page from ending on a flat dark slab.
            '.axo-app .site-footer{background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 55%,#4338ca 100%) !important}',
            '.axo-app .site-footer .footer-bottom{border-top-color:rgba(255,255,255,.16) !important}',
            '.axo-app .site-footer a{color:#c7d2fe !important}',
            '.axo-app .site-footer .footer-links a:hover,.axo-app .site-footer a:hover{color:#fff !important}'
          ].join('');

          var BANNER =
            '<span class="axo-banner-kicker">Assam Competitive Exams &middot; অসম প্ৰতিযোগিতামূলক পৰীক্ষা</span>' +
            '<h2>Welcome to axomexam</h2>' +
            '<p class="axo-banner-as">নমস্কাৰ! ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে\\'লৱে পৰীক্ষাৰ বাবে ' +
            '{Q} প্ৰশ্ন আৰু {T} বিষয়ৰ সৈতে দুয়ো ভাষাত প্ৰস্তুতি আৰম্ভ কৰক।</p>' +
            '<p class="axo-banner-en">Welcome! Prepare in Assamese &amp; English with {Q} questions ' +
            'and {T} topics for ADRE, APSC, Assam Police, SSC, Railway and more.</p>' +
            '<div class="axo-banner-stats">' +
            '<div><b>{Q}</b><span>Questions</span></div>' +
            '<div><b>{T}</b><span>Topics</span></div>' +
            '<div><b>50+</b><span>Exams</span></div>' +
            '</div>' +
            '<div class="axo-chips">' +
            '<i>ADRE III</i><i>ADRE IV</i><i>Assam Police</i><i>APSC</i>' +
            '<i>SSC</i><i>Railway</i><i>DHS &amp; DME</i><i>Gauhati HC</i>' +
            '</div>';

          window.axoAppChrome = function () {
            try {
              if (!document.getElementById('axo-app-css')) {
                var css = document.createElement('style');
                css.id = 'axo-app-css';
                css.textContent = CSS;
                document.head.appendChild(css);
              }
              var app = document.getElementById('app');
              if (!app) {
                return;
              }
              // The banner replaces the home hero, so keep it on the home route
              // only; other routes have their own page header.
              var path = location.pathname.replace(/\\/+$/, '');
              if (path !== '' && path !== '/index.html') {
                return;
              }
              if (!document.getElementById('axo-banner')) {
                var banner = document.createElement('div');
                banner.id = 'axo-banner';
                banner.className = 'axo-banner';
                banner.innerHTML = BANNER;
                app.insertBefore(banner, app.firstChild);
              }
              // The hero is only hidden by CSS, so its counters - filled from the
              // live counts.json - are still in the DOM. Mirror them onto the
              // banner instead of shipping numbers that go stale between releases.
              axoFillBanner();
            } catch (e) {}
          };

          // Copy the live hero counters onto the banner's {Q}/{T} placeholders.
          window.axoFillBanner = function () {
            try {
              var banner = document.getElementById('axo-banner');
              if (!banner) return;
              var q = document.getElementById('stat-total-questions');
              var t = document.getElementById('stat-total-topics');
              var qv = q && q.textContent ? q.textContent : '';
              var tv = t && t.textContent ? t.textContent : '';
              if (!qv && !tv) return;
              if (qv) banner.innerHTML = banner.innerHTML.split('{Q}').join(qv);
              if (tv) banner.innerHTML = banner.innerHTML.split('{T}').join(tv);
            } catch (e) {}
          };

          // Route changes render asynchronously, so a single call can land
          // before the new view exists. Re-run a few times; the work is
          // idempotent and stops as soon as the nodes are present.
          window.axoScheduleChrome = function () {
            [0, 120, 350, 700, 1300, 2200].forEach(function (delay) {
              setTimeout(window.axoAppChrome, delay);
            });
          };

          if (!window.__axoAppHook) {
            window.__axoAppHook = true;
            var push = history.pushState;
            history.pushState = function () {
              var result = push.apply(this, arguments);
              window.axoScheduleChrome();
              return result;
            };
            window.addEventListener('popstate', window.axoScheduleChrome);

            // The site re-renders #app on its own, which would drop the banner,
            // so re-add it whenever that subtree changes.
            var observe = function () {
              var app = document.getElementById('app');
              if (app && window.MutationObserver) {
                new MutationObserver(function () {
                  window.axoAppChrome();
                }).observe(app, { childList: true });
              }
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', observe);
            } else {
              observe();
            }
          }
          window.axoScheduleChrome();
        } catch (e) {}
      })();
      """;

  private void syncNavSelection(String url) {
    String path = Uri.parse(url == null ? HOME_URL : url).getPath();
    path = path == null ? "/" : path;
    setNavActive(R.id.nav_home, path.equals("/") || path.isEmpty());
    setNavActive(R.id.nav_mock, path.startsWith("/mock-test"));
    setNavActive(R.id.nav_practice, path.startsWith("/categor"));
    setNavActive(R.id.nav_search, path.startsWith("/search"));
  }

  private void setNavActive(int itemId, boolean active) {
    View item = findViewById(itemId);
    if (item == null) {
      return;
    }
    int color = ContextCompat.getColor(this, active ? R.color.nav_active : R.color.nav_inactive);
    ImageView iv = item.findViewById(navIconId(itemId));
    TextView tv = item.findViewById(navLabelId(itemId));
    if (iv != null) {
      iv.setColorFilter(color);
    }
    if (tv != null) {
      tv.setTextColor(color);
      tv.setTypeface(tv.getTypeface(), active ? Typeface.BOLD : Typeface.NORMAL);
    }
    item.setBackgroundResource(active ? R.drawable.nav_item_active : R.drawable.nav_item_bg);
  }

  private int navIconId(int itemId) {
    if (itemId == R.id.nav_home) return R.id.iv_home;
    if (itemId == R.id.nav_mock) return R.id.iv_mock;
    if (itemId == R.id.nav_practice) return R.id.iv_practice;
    if (itemId == R.id.nav_search) return R.id.iv_search;
    return R.id.iv_menu;
  }

  private int navLabelId(int itemId) {
    if (itemId == R.id.nav_home) return R.id.tv_home;
    if (itemId == R.id.nav_mock) return R.id.tv_mock;
    if (itemId == R.id.nav_practice) return R.id.tv_practice;
    if (itemId == R.id.nav_search) return R.id.tv_search;
    return R.id.tv_menu;
  }

  /** Minimal bridge so the site can detect the app shell if it ever needs to. */
  private class AppBridge {
    @JavascriptInterface
    public String platform() {
      return "android";
    }

    @JavascriptInterface
    public String version() {
      try {
        return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
      } catch (Exception e) {
        return "";
      }
    }
  }

  /* ============================ lifecycle ============================ */

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    if (intent != null && intent.getData() != null) {
      web.loadUrl(intent.getData().toString());
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQ_FILE_CHOOSER) {
      if (fileCallback != null) {
        fileCallback.onReceiveValue(
            WebChromeClient.FileChooserParams.parseResult(resultCode, data));
        fileCallback = null;
      }
      return;
    }
    super.onActivityResult(requestCode, resultCode, data);
  }

  @Override
  public void onBackPressed() {
    if (onboardView.getVisibility() == View.VISIBLE) {
      finishOnboarding();
      return;
    }
    if (drawerOverlay.getVisibility() == View.VISIBLE) {
      closeDrawer();
      return;
    }
    if (web.canGoBack()) {
      web.goBack();
      return;
    }
    long now = System.currentTimeMillis();
    if (now - lastBackPress < 2000) {
      super.onBackPressed();
    } else {
      lastBackPress = now;
      toast(getString(R.string.toast_back_again));
    }
  }

  @Override
  protected void onPause() {
    super.onPause();
    web.onPause();
  }

  @Override
  protected void onResume() {
    super.onResume();
    web.onResume();
  }

  @Override
  protected void onDestroy() {
    ui.removeCallbacksAndMessages(null);
    if (web != null) {
      web.destroy();
    }
    super.onDestroy();
  }
}
