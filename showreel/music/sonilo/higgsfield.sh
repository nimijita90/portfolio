#!/usr/bin/env bash
# Generates the showreel score with the Higgsfield CLI (sonilo_music: prompt + duration only, ~4 credits per take).
#   bash higgsfield.sh        -> 1 take;   TAKES=3 bash higgsfield.sh -> 3 takes to choose from
set -euo pipefail
cd "$(dirname "$0")"
higgsfield generate cost sonilo_music --prompt "test" --duration 63
for i in $(seq 1 "${TAKES:-1}"); do
  higgsfield generate create sonilo_music --duration 63 --prompt "$(cat higgsfield-prompt.txt)" --wait --json | tee "take-$i.json"
done
