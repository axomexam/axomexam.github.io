package in.axomexam.app;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebView;

/**
 * WebView that reports vertical scroll so the activity can drive the
 * scroll-to-top button and keep the hero banner in sync with the page.
 */
public class AppWebView extends WebView {

  public interface ScrollListener {
    void onScrollChanged(int scrollY);
  }

  private ScrollListener listener;

  public AppWebView(Context context) {
    super(context);
  }

  public AppWebView(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public void setScrollListener(ScrollListener listener) {
    this.listener = listener;
  }

  @Override
  protected void onScrollChanged(int l, int t, int oldl, int oldt) {
    super.onScrollChanged(l, t, oldl, oldt);
    if (listener != null) {
      listener.onScrollChanged(t);
    }
  }

  @Override
  public boolean onTouchEvent(MotionEvent event) {
    if (event.getAction() == MotionEvent.ACTION_DOWN) {
      performClick();
    }
    return super.onTouchEvent(event);
  }

  @Override
  public boolean performClick() {
    return super.performClick();
  }
}
