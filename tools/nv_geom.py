#!/usr/bin/env python3
"""Exact counting of lines, triangles, rectangles and squares in a set of
drawn segments. Used by the counting-of-figures generator, which must publish
the true count, not a guessed one."""

from itertools import combinations
import nv_shapes as S

EPS = 1e-6


def seg(p, q):
    return (p, q)


def _cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def _on(p, a, b):
    return (min(a[0], b[0]) - EPS <= p[0] <= max(a[0], b[0]) + EPS and
            min(a[1], b[1]) - EPS <= p[1] <= max(a[1], b[1]) + EPS and
            abs(_cross(a, b, p)) < EPS)


def intersect(s1, s2):
    (a, b), (c, d) = s1, s2
    r = (b[0] - a[0], b[1] - a[1])
    s = (d[0] - c[0], d[1] - c[1])
    den = r[0] * s[1] - r[1] * s[0]
    if abs(den) < EPS:
        return []
    t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den
    u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den
    if -EPS <= t <= 1 + EPS and -EPS <= u <= 1 + EPS:
        return [(round(float(a[0] + t * r[0]), 2), round(float(a[1] + t * r[1]), 2))]
    return []


def points(segs):
    pts = set()
    for a, b in segs:
        pts.add((round(float(a[0]), 2), round(float(a[1]), 2)))
        pts.add((round(float(b[0]), 2), round(float(b[1]), 2)))
    for s1, s2 in combinations(segs, 2):
        for p in intersect(s1, s2):
            pts.add(p)
    return sorted(pts)


def _contains(a, b, s):
    return _on(a, *s) and _on(b, *s)


def connected(a, b, segs):
    """True when the whole of ab is drawn, even if it is split across
    several collinear segments (grid lines are drawn cell by cell)."""
    if a == b:
        return False
    dx, dy = b[0] - a[0], b[1] - a[1]
    L2 = dx * dx + dy * dy
    spans = []
    for s in segs:
        p, q = s
        if not (_on(a, p, q) and _on(b, p, q)):
            continue
        t1 = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2
        t2 = ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L2
        spans.append((min(t1, t2), max(t1, t2)))
    if not spans:
        return False
    spans.sort()
    reach = 0.0
    for lo, hi in spans:
        if lo > reach + 0.01:
            break
        reach = max(reach, hi)
        if reach >= 1 - 0.01:
            return True
    return False


def count_triangles(segs, pts=None):
    pts = pts or points(segs)
    conn = {frozenset((p, q)) for p, q in combinations(pts, 2) if connected(p, q, segs)}
    n = 0
    for a, b, c in combinations(pts, 3):
        if abs(_cross(a, b, c)) < EPS:
            continue
        if frozenset((a, b)) in conn and frozenset((b, c)) in conn and frozenset((a, c)) in conn:
            n += 1
    return n


def _rects(segs, pts, squares_only=False):
    conn = {frozenset((p, q)) for p, q in combinations(pts, 2) if connected(p, q, segs)}
    n = 0
    for a, b, c, d in combinations(pts, 4):
        for (p0, p1, p2, p3) in ((a, b, c, d), (a, b, d, c), (a, c, b, d)):
            if abs((p0[0] + p2[0]) - (p1[0] + p3[0])) > 0.05:
                continue
            if abs((p0[1] + p2[1]) - (p1[1] + p3[1])) > 0.05:
                continue
            v1 = (p1[0] - p0[0], p1[1] - p0[1])
            v2 = (p3[0] - p0[0], p3[1] - p0[1])
            if abs(v1[0] * v2[0] + v1[1] * v2[1]) > 0.05:
                continue
            if not all(frozenset(e) in conn for e in ((p0, p1), (p1, p2), (p2, p3), (p3, p0))):
                continue
            if squares_only and abs(v1[0] ** 2 + v1[1] ** 2 - (v2[0] ** 2 + v2[1] ** 2)) > 0.05:
                continue
            n += 1
            break
    return n


def count_rectangles(segs, pts=None):
    pts = pts or points(segs)
    return _rects(segs, pts)


def count_squares(segs, pts=None):
    pts = pts or points(segs)
    return _rects(segs, pts, squares_only=True)


def count_lines(segs):
    lines = set()
    for (a, b) in segs:
        dx, dy = b[0] - a[0], b[1] - a[1]
        norm = (dx * dx + dy * dy) ** 0.5
        if norm < EPS:
            continue
        nx, ny = -dy / norm, dx / norm
        c = nx * a[0] + ny * a[1]
        if nx < -EPS or (abs(nx) < EPS and ny < 0):
            nx, ny, c = -nx, -ny, -c
        lines.add((round(nx, 3), round(ny, 3), round(c, 3)))
    return len(lines)


def draw(segs, w=72, extra=""):
    parts = []
    for a, b in segs:
        parts.append(f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}"/>')
    return S.svg("".join(parts) + extra, w)
