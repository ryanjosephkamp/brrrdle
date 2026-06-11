# Phase 23 Stage 19 Bugs

Thank you. I found three main bugs following stage 18 from phase 23, and all of these need to be addressed before we can proceed to phase 24. These bugs appear to be very narrow, so Codex should only perform a very targeted, specific debugging and fixing pass or a series of patches to the game. It must be extremely careful not to break anything else; it should only change things that are immediately pertinent or relevant to the problems described below. If any new bugs arise, it can fix those as well, as always, and it should perform the full comprehensive set of tests for regressions and anything else, just like it has been. Hopefully, Codex can fix this in one new stage 19 iteration. If it needs another stage after this, then I am willing to use a stage 20, but only if necessary. 

---

The first bug I found was something we correctly fixed in the multiplayer GO practice variant of the game, but it does not appear to have been applied properly to the solo Geo practice, and I presume it was not applied to the daily Geo solo mode. Therefore, I would like Codex to make a highly targeted fix for this. This is a bug that was previously fixed. Codex can review the changes made to the multiplayer practice GO to understand what is needed to improve the solo practice GO and the solo daily GO.

The Puzzle does not have a transition screen after a correct solution in Go. For solo Go, there is no screen showing all green letters to indicate a correct guess, nor is there a sound confirming the correct guess. Codex should carefully examine the implementation in the practice Go multiplayer and make a very small, targeted change to the daily solo Go and practice solo Go games to include this transition screen after every correct guess, just like the multiplayer practice Go currently does. Codex should look at how multiplayer practice Go handles this and use the same approach—the same transition screen, duration, and sound—to integrate this into the solo daily and solo practice Go games.

This is happening for both the daily solo go variant of the game and the Practice solo go variant. So, it is happening in both daily and practice.

I can also confirm that this is not happening for the multiplayer Go variants. So, it's not happening for the daily multiplayer Go or the practice multiplayer Go.

The next bug I found is something I believe we fixed in the multiplayer practice go variants, but it does not look like it has been correctly fixed in the multiplayer daily go variant. 

We already fixed this bug for the multiplayer and solo practice GO variants, but it is still happening for the multiplayer daily GO and the solo daily GO variants. 

Codex should look at how we address this problem for the multiplayer and solo practice GO variants of the game. It should use the same exact approach in a very narrow and targeted bug fixing pass to correct this problem for the multiplayer daily GO and the solo daily GO variants.

The coloring for the GO game should work as follows: If there is a green letter on the board, the corresponding letter on the keyboard should be green. If there is an orange letter on the board and no green letter of that same kind is present, the corresponding keyboard key letter should be orange. Finally, if there is a gray letter on the board and no green or orange letter of the same kind is present, the corresponding letter on the keyboard should be gray.

That set of rules should apply at all times during every GO game, across all variants of GO, from solo to multiplayer, daily to practice. As I mentioned, this is currently being enforced and implemented properly for practice solo and multiplayer GO games, but it is not being enforced properly for daily solo and multiplayer GO games. So, we need Codex to fix this for the daily GO games.

This actually appears to mainly, or maybe even only, affect the very final puzzle in the GO chain. So, I think the keyboard is being updated properly during the other puzzles, but just not the last one for some reason.

This second bug may be very closely related to the third one I'm going to describe below. Perhaps both bugs are caused by the same problem or a similar one. Codex needs to look very carefully at this to determine the issue.

The third bug I noticed is something critical.

This appears to be happening in multiplayer GO for practice mode, and maybe also for daily.

Note that I haven't tested this as fully as I've tested the others because I don't have enough accounts to confirm if this is happening daily. Codex should hopefully test whether this is happening daily or at least try to find what the problem is and fix it.

Describing this with a real example would be best. I was playing against myself, with two players on a multiplayer practice GO game. On the fourth puzzle, many guesses were made, requiring several turns beyond the usual two or three to guess the correct word. Once Player Two made the correct guess, the transition screen appeared on both players' screens, but the transition did not happen for Player One's screen. It only appeared on Player Two's screen. The game appeared to shift to solo mode for Player Two, while Player One's screen remained frozen, waiting for the other player's transition screen with the green gas from puzzle four. However, when Player Two won puzzle five, the game ended for both players. To summarize: the transition screen appeared after the successful guess of the fourth puzzle in a five-puzzle multiplayer Geo game, but the transition to the final puzzle screen only happened for the second player, who did not make the correct guess for puzzle four, and not for Player One. When Player Two submitted their next guess, the game behaved like solo Go, and nothing updated on Player One's screen. Both screens still showed it was Player Two's turn, allowing Player Two to submit another guess until they completed the puzzle, effectively like a solo Go game would.

It is somewhat difficult to describe the bug. It might be a combination of multiple bugs, but hopefully, you can understand what I am trying to describe from that example. This seems like a critical bug because if it occurs, it locks the player whose screen does not transition properly out of the multiplayer game until the game ends, from what I can tell. So, we absolutely need to fix this. Hopefully, this will only require one additional stage within phase 23, but depending on how extensive or complicated this last bug is, it might take more than one stage. I expect that will take some time, but it is still something that needs to be done before we can proceed to phase 24.

---

Thanks again for all your help.