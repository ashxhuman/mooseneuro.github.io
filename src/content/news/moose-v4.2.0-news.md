---
title: "MOOSE v4.2.0 Kalakand is here!"
date: 2026-04-02
---

### v4.2.0 &mdash; *`Kalakand`*

We are excited to announce the release of **MOOSE v4.2.0 Kalakand** &mdash; a major update bringing significant improvements to neuron morphology handling, model loading, the Python interface, and the build system.

**GitHub:** 📦 [Release v4.2.0 — Kalakand](https://github.com/MooseNeuro/moose-core/releases/tag/v4.2.0) &nbsp;·&nbsp; **PyPI:** [pymoose 4.2.0](https://pypi.org/project/pymoose/4.2.0/)

---

## What's New

### Neuron Morphology

- Improved support for loading neuron morphologies: SWC files with 2-point soma (as used by Arbor) and 3-point soma formats are now handled correctly
- Automated SWC compartmentalization using uniform RA and RM based on [ShapeShifter](https://github.com/neurord/ShapeShifter)
- Added a dedicated `moose.loadSwc()` function for loading SWC files with optional electrical parameters (RM, RA, CM)

### Model Loading

- Added explicit `moose.loadKkit()` function for loading GENESIS Kkit models
- NeuroML2 model path is now configurable instead of being hardcoded

### Python Interface

- Consistent and informative string representation for all MOOSE Python objects, making debugging and interactive use easier
- `getFieldNames()` is now available as a method in MOOSE objects
- `getFieldDict` renamed to `getFieldTypeDict`

### Build and Packaging

- Python bindings rebuilt on `nanobind`, replacing `pybind11`, resulting in faster and smaller code
- Building MOOSE from source is now simpler, with fewer manual setup steps required
- Updated CI workflows for the new build system

---

## Bugs Fixed

- Fixed incorrect behaviour when setting attributes on element fields via Python
- Fixed an intermittent issue where expression evaluation could fail unpredictably under certain conditions
- Fixed missing runtime dependencies for NeuroML2 module (`pint`, `scipy`)

---

## Breaking Changes

Please review the following before upgrading:

- Some legacy and unused Python utility modules have been removed. If your scripts import from `moose.recording`, `moose.constants`, or `moose.method_utils`, you will need to update them
- `getFieldDict` has been renamed to `getFieldTypeDict`. If your scripts use this function, update the name accordingly

---

## Trivia

*[Kalakand](https://en.wikipedia.org/wiki/Kalakand)* is a popular Indian sweet made by reducing milk with sugar and paneer (fresh cheese) until thick and grainy, then set into soft, fudge-like squares. It is often garnished with cardamom and pistachios.

---

*Thank you to everyone who contributed to this release!*