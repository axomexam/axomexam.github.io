#!/usr/bin/env python3
"""Inline-SVG figure helpers for the non-verbal reasoning banks."""

import math

INK = "#0f172a"
SHADE = "#a5b4fc"
LIGHT = "#e0e7ff"


def svg(inner, size=72):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            f'width="{size}" height="{size}" role="img" aria-label="figure">'
            f'<g stroke="{INK}" stroke-width="3" stroke-linejoin="round" '
            f'stroke-linecap="round" fill="none">{inner}</g></svg>')


def g(inner, transform):
    return f'<g transform="{transform}">{inner}</g>'


def rotate(inner, deg):
    return g(inner, f"rotate({deg} 50 50)")


def mirror(inner):
    return g(inner, "translate(100 0) scale(-1 1)")


def water(inner):
    return g(inner, "translate(0 100) scale(1 -1)")


def turn180(inner):
    return rotate(inner, 180)


def poly(points, shade=False):
    pts = " ".join(f"{x},{y}" for x, y in points)
    fill = SHADE if shade else "none"
    return f'<polygon points="{pts}" fill="{fill}"/>'


def rect(x, y, w, h, shade=False):
    fill = SHADE if shade else "none"
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"/>'


def circ(cx, cy, r, shade=False):
    fill = SHADE if shade else "none"
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'


def dot(cx, cy, r=7):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{INK}"/>'


def regular(n, cx=50, cy=52, r=34, start=-90):
    pts = []
    for i in range(n):
        a = math.radians(start + i * 360 / n)
        pts.append((round(cx + r * math.cos(a), 1), round(cy + r * math.sin(a), 1)))
    return pts


def star(cx=50, cy=52, r_out=36, r_in=15):
    pts = []
    for i in range(10):
        r = r_out if i % 2 == 0 else r_in
        a = math.radians(-90 + i * 36)
        pts.append((round(cx + r * math.cos(a), 1), round(cy + r * math.sin(a), 1)))
    return pts


ARROW = [(50, 10), (72, 42), (58, 42), (58, 88), (42, 88), (42, 42), (28, 42)]
FLAG = [(30, 18), (72, 18), (72, 44), (46, 44), (46, 84), (30, 84)]
TEE = [(22, 18), (78, 18), (78, 36), (58, 36), (58, 84), (42, 84), (42, 36), (22, 36)]
TRI = [(50, 14), (86, 82), (14, 82)]
SQUARE = [(24, 24), (76, 24), (76, 76), (24, 76)]
DIAMOND = [(50, 12), (88, 50), (50, 88), (12, 50)]


def arrow(deg=0, shaded=False, mark=None):
    body = poly(ARROW, shaded)
    if mark == "right":
        body += dot(66, 26)
    elif mark == "left":
        body += dot(34, 26)
    return rotate(body, deg)


def flag(deg=0, shaded=False):
    return rotate(poly(FLAG, shaded), deg)


def tee(deg=0, shaded=False):
    return rotate(poly(TEE, shaded), deg)


def tri(deg=0, shaded=False):
    return rotate(poly(TRI, shaded), deg)


def sq(deg=0, shaded=False):
    return rotate(poly(SQUARE, shaded), deg)


def diamond(deg=0, shaded=False):
    return rotate(poly(DIAMOND, shaded), deg)


def pent(deg=0, shaded=False):
    return rotate(poly(regular(5), shaded), deg)


def hexa(deg=0, shaded=False):
    return rotate(poly(regular(6), shaded), deg)


def starfig(deg=0, shaded=False):
    return rotate(poly(star(), shaded), deg)


def grid(holes, n=4, cell=None, x0=2, y0=2):
    """n×n paper grid with punched cells filled."""
    if cell is None:
        cell = 96.0 / n
    parts = [rect(x0, y0, n * cell, n * cell)]
    for i in range(1, n):
        parts.append(f'<line x1="{x0 + i * cell}" y1="{y0}" x2="{x0 + i * cell}" y2="{y0 + n * cell}" stroke="{LIGHT}" stroke-width="2"/>')
        parts.append(f'<line x1="{x0}" y1="{y0 + i * cell}" x2="{x0 + n * cell}" y2="{y0 + i * cell}" stroke="{LIGHT}" stroke-width="2"/>')
    for (r, c) in holes:
        cx = x0 + c * cell + cell / 2
        cy = y0 + r * cell + cell / 2
        parts.append(dot(cx, cy, max(4, cell * 0.22)))
    return "".join(parts)


def hept(deg=0, shaded=False):
    return rotate(poly(regular(7), shaded), deg)


def octa(deg=0, shaded=False):
    return rotate(poly(regular(8), shaded), deg)


def circle_fig(deg=0, shaded=False):
    return circ(50, 52, 32, shaded)


def boxed(inner, w=64):
    return ('<span style="display:inline-flex;align-items:center;justify-content:center;'
            'border:1px solid #e2e8f0;border-radius:10px;background:#fff;padding:4px;'
            f'margin:0 2px;vertical-align:middle">{svg(inner, w)}</span>')


def row(figs, sep="&#8594;", tail="?", w=64):
    parts = [boxed(f, w) for f in figs]
    joiner = f'<span style="margin:0 4px;color:#475569;font-weight:700">{sep}</span>'
    out = joiner.join(parts)
    if tail:
        out += joiner + ('<span style="display:inline-flex;align-items:center;justify-content:center;'
                         'border:1px dashed #94a3b8;border-radius:10px;background:#f8fafc;'
                         f'width:{w + 8}px;height:{w + 8}px;margin:0 2px;color:#475569;'
                         f'font-weight:800;font-size:1.1rem">{tail}</span>')
    return f'<div style="display:flex;flex-wrap:wrap;align-items:center;gap:2px">{out}</div>'


F_SHAPE = [(28, 14), (74, 14), (74, 30), (46, 30), (46, 46), (68, 46),
           (68, 62), (46, 62), (46, 86), (28, 86)]


def eff(deg=0, shaded=False, dot_at=None):
    body = poly(F_SHAPE, shaded)
    if dot_at:
        body += dot(*dot_at)
    return rotate(body, deg)
