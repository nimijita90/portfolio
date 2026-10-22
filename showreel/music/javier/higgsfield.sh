#!/usr/bin/env bash
# Generates candidate scores for Javier's showreel with the Higgsfield CLI (sonilo_music: prompt + duration only).
#   bash higgsfield.sh            -> one take of each prompt (A, B, C)
#   PROMPTS="A" TAKES=2 bash higgsfield.sh -> two takes of prompt A
set -euo pipefail
cd "$(dirname "$0")"
higgsfield generate cost sonilo_music --prompt "test" --duration 55
for p in ${PROMPTS:-A B C}; do
  for i in $(seq 1 "${TAKES:-1}"); do
    higgsfield generate create sonilo_music --duration 55 --prompt "$(cat "prompt-$p.txt")" --wait --json | tee "take-$p$i.json"
  done
done
