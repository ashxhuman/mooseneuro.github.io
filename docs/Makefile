# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = conda run -n moose python -msphinx
SPHINXPROJ    = MOOSE
SOURCEDIR     = source
BUILDDIR      = ../public/docs

export MOOSE_CORE_PATH := $(abspath $(dir $(lastword $(MAKEFILE_LIST)))moose-core)

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile doxygen

doxygen:
	cd $(dir $(lastword $(MAKEFILE_LIST)))doxygen && doxygen Doxyfile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)