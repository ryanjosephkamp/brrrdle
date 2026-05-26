import wordsLength2 from "./bundled/words_length_2.json"
import wordsLength3 from "./bundled/words_length_3.json"
import wordsLength4 from "./bundled/words_length_4.json"
import wordsLength5 from "./bundled/words_length_5.json"
import wordsLength6 from "./bundled/words_length_6.json"
import wordsLength7 from "./bundled/words_length_7.json"
import wordsLength8 from "./bundled/words_length_8.json"
import wordsLength9 from "./bundled/words_length_9.json"
import wordsLength10 from "./bundled/words_length_10.json"
import wordsLength11 from "./bundled/words_length_11.json"
import wordsLength12 from "./bundled/words_length_12.json"
import wordsLength13 from "./bundled/words_length_13.json"
import wordsLength14 from "./bundled/words_length_14.json"
import wordsLength15 from "./bundled/words_length_15.json"
import wordsLength16 from "./bundled/words_length_16.json"
import wordsLength17 from "./bundled/words_length_17.json"
import wordsLength18 from "./bundled/words_length_18.json"
import wordsLength19 from "./bundled/words_length_19.json"
import wordsLength20 from "./bundled/words_length_20.json"
import wordsLength21 from "./bundled/words_length_21.json"
import wordsLength22 from "./bundled/words_length_22.json"
import wordsLength23 from "./bundled/words_length_23.json"
import wordsLength24 from "./bundled/words_length_24.json"
import wordsLength25 from "./bundled/words_length_25.json"
import wordsLength26 from "./bundled/words_length_26.json"
import wordsLength27 from "./bundled/words_length_27.json"
import wordsLength28 from "./bundled/words_length_28.json"
import wordsLength29 from "./bundled/words_length_29.json"
import wordsLength30 from "./bundled/words_length_30.json"
import wordsLength31 from "./bundled/words_length_31.json"
import wordsLength32 from "./bundled/words_length_32.json"
import wordsLength33 from "./bundled/words_length_33.json"
import wordsLength34 from "./bundled/words_length_34.json"
import wordsLength35 from "./bundled/words_length_35.json"

export const BUNDLED_WORD_LISTS = {
  2: wordsLength2,
  3: wordsLength3,
  4: wordsLength4,
  5: wordsLength5,
  6: wordsLength6,
  7: wordsLength7,
  8: wordsLength8,
  9: wordsLength9,
  10: wordsLength10,
  11: wordsLength11,
  12: wordsLength12,
  13: wordsLength13,
  14: wordsLength14,
  15: wordsLength15,
  16: wordsLength16,
  17: wordsLength17,
  18: wordsLength18,
  19: wordsLength19,
  20: wordsLength20,
  21: wordsLength21,
  22: wordsLength22,
  23: wordsLength23,
  24: wordsLength24,
  25: wordsLength25,
  26: wordsLength26,
  27: wordsLength27,
  28: wordsLength28,
  29: wordsLength29,
  30: wordsLength30,
  31: wordsLength31,
  32: wordsLength32,
  33: wordsLength33,
  34: wordsLength34,
  35: wordsLength35,
} as const satisfies Readonly<Record<number, unknown>>

export const BUNDLED_WORD_LIST_LENGTHS = Object.keys(BUNDLED_WORD_LISTS).map(Number).sort((a, b) => a - b)
