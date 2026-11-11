# Changes made to the font files in this folder

The fonts are used under the SIL Open Font License (the `OFL-*.txt` files beside them), which allows
modified versions. One change has been made.

## Hedvig Letters Serif, 18pt and 14pt Regular (kit 1.1.0, 2026-11-11)

**The "ff" ligature rule was removed.** In the 18pt file the ligature glyph `f_f` is corrupt: its two
f shapes are drawn on top of each other, so "different" was set as "di f erent" and "staff" as
"sta f" wherever ligatures were on. In the 14pt file the same glyph is misplaced. The glyph is still
in the files; the rule that substitutes it for two f's (`f f → f_f` in the `liga` feature) is gone,
so "ff" is set as two ordinary f's. Every other ligature (`ffi`, `fi`, `fl`, `fb`, `fh`, `fk`, `ft`,
`tt`) is untouched and correct.

Done with fontTools: in each `liga` lookup, the ligature with first glyph `f`, component `f` and
result `f_f` was deleted, and the file saved. Nothing else in the files changed.

If Kanon Foundry publishes corrected files, replace these and delete this note.
