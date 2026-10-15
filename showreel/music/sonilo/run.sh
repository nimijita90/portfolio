#!/usr/bin/env bash
# Scores the silent showreel with Sonilo (video-to-music). Run on your own machine:
#   pip install sonilo-cli      (or: npm install -g sonilo-cli)
#   sonilo login                (one-time, approves in the browser)
#   bash run.sh path/to/showreel-silent.mp4
# VARIANTS=1 uses the free trial run (if still available); 3 gives three takes to choose from, billed 3x.
set -euo pipefail
cd "$(dirname "$0")"
VIDEO="${1:-showreel-silent.mp4}"
sonilo video-to-music \
  --video "$VIDEO" \
  --prompt "$(cat prompt.txt)" \
  --segments @segments.json \
  --prompt-influence 0.6 \
  --format wav \
  --variants "${VARIANTS:-3}" \
  --output showreel-music.wav
