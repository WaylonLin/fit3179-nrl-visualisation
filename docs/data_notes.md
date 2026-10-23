# Data and interpretation notes — feedback revision, 21 October 2026

This review is based on deployed main commit a470804. Data files are unchanged. Original source attribution, Waylon Lin's author details and the current AI acknowledgement are preserved in index.html.

## Coverage and joins

- 612 regular-season matches across 2023–2025; 1,224 team appearances in provider metrics.
- 204 regular-season matches in 2025, 24 per team; 408 scoring observations.
- Geographic hosting and venue views include all 213 fixtures including finals: Australia 199, NZ 12, Las Vegas 2.
- Club connection views cover 24 regular-season fixtures per selected club, with 12 designated home fixtures.
- Half-time matrix includes all 204 matches; finals are excluded from performance comparisons and transitions.
- State populations use preliminary ABS ERP at 30 June 2025, aggregated from matching LGAs. Geometry is simplified for display. No new boundary simplification is needed for this revision.

## Encodings and denominators

Profiles: rank 1 is strongest according to the stated direction. Ranks show order, not magnitude. Actual values have an independently normalised minimum–maximum colour scale per metric; no common raw-unit scale is used. Numeric cell values give magnitude within a metric. Ties share ranks.

Hosting: count bars show absolute fixtures. The choropleth shows fixtures / population × 100,000. The ACT's small administrative population raises its rate; the rate measures hosting intensity only, not demand, access or catchment. Zero is distinguished from missing data. All nine state/territory categories have observations, including zero counts.

Venue symbols: area is continuously proportional to fixture count, with legend references 5, 15 and 30. These are not bins. Sydney detail separates nearby grounds; Pacific extent retains Las Vegas. Counts are fixtures, not attendance or event days.

Connections: established home-ground anchors are based on the cited club announcements; Penrith's anchor is the historical home-ground site under redevelopment. Width represents repeated fixtures. Zero-length connections are suppressed but counts remain in point tooltips. Lines are schematic associations, not travel routes or evidence of travel effects. Scope and extent must be read together.

Scatter: 462/609 decisive games had the winner gaining more run metres (75.9%). Within the 319 games decided by 1–12 points, 189 did (59.2%). Three draws are in the full scatter and the ±12 band but excluded from both percentages and the close-game filter. Associations are simultaneous, not predictive or causal.

Canterbury: opponent line breaks fell from 6.667 to 3.542 per match; opponent run metres fell from 1606.542 to 1335.583. Separate panel scales retain separate units. In 2024 Canterbury had the fewest opponent line breaks despite the most missed tackles. This contradicts treating missed tackles alone as a sufficient defensive summary.

Dolphins: 721 points scored, 596 conceded, 12 wins, 12 losses, ninth. Their five lowest scores were all 12 in losses; the high was 62 in the round-27 win against Canberra. Mean scoring in wins was 41.4167. Ladder position depends on match results; scoring dispersion does not establish why they finished ninth. Box whiskers deliberately span the full minimum–maximum range, not a Tukey outlier rule.

Transitions: home leads 109 → 89 home wins, 20 away wins, 0 draws; away leads 77 → 18 home wins, 58 away wins, 1 draw; level 18 → 8 home wins, 10 away wins, 0 draws. Counts sum to 204. Row percentages use 109, 77 and 18 respectively; independently rounded percentages can total 100.1%. Of 186 half-time leads, 147 held, 38 reversed, one ended in a draw.

Penrith: end-of-round positions 17 at round 12, 4 at round 23, 7 at round 27. Hollow markers indicate byes (rounds 11, 15, 18). Bye points and unequal games played affect interim rank.

Finals: nine matches appear twice, once for each participant; two rest nodes are not games. Second chances after qualifying-final losses mean this is not a simple single-elimination bracket. Dates and team-perspective scores remain intact.

## Existing limitation

The nrlR code licence does not establish public-reuse permission for Champion Data's underlying feed. This remains unresolved and is disclosed on the page. No additional datasets or dependencies were introduced.
