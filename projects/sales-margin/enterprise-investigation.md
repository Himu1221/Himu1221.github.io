# Enterprise profitability investigation

## Executive decision
Prioritize validation of the Enterprise product/country combinations with the greatest observed loss exposure. Investigate cost definitions and discount constraints before proposing any price change. This is an independent sample-data investigation; no stakeholders were interviewed and no intervention was implemented.

## Evidence
- Enterprise has 100 observations, $19,611,694 net sales, and -$614,546 net reported profit.
- Its 58 negative-profit observations total $777,321 in gross losses. Positive-profit observations offset those losses by $162,776. Gross loss and net loss answer different questions; neither is an estimate of recoverable savings.
- The largest gross-loss combination is **VTT / Canada**: $77,394, representing 10.0% of Enterprise gross loss.
- The top three combinations account for 26.2% of gross loss. Rankings use negative observations, while the tables also show net profit including offsets.
- Enterprise is net loss-making in 13 of 16 calendar months. Review the monthly table to distinguish persistence from isolated exceptions.
- The **High** discount band contains 80.1% of Enterprise gross loss. This is an association: product mix, customer contracts, cost allocation, and demand may explain the pattern.

## Comparable-period method
Compare September–December 2013 with September–December 2014, not the unequal full-year totals. Each period must contain four observed months. This corrects month coverage but does not control for product/customer mix, observation counts, inflation, or currency. Profit change is shown in dollars because percentage growth from negative profit can mislead.

## Options and recommendation
| Option | Benefit | Main limitation | Decision |
|---|---|---|---|
| Continue monitoring | No policy disruption | Does not investigate recurring losses | Retain as baseline |
| Validate high-loss combinations with finance and sales | Focuses review on documented exposure | Needs contract and cost information absent here | Recommended first |
| Reduce discounts across Enterprise | Could improve unit realization | Could reduce demand or breach contractual constraints; causality unproven | Do not recommend from this evidence alone |

## Proposed action and measurement plan
1. Finance/data owner: verify record grain, currency normalization, COGS allocation, and unusual cost/price relationships. Deliverable: signed-off definitions or a corrections log.
2. Sales owner: review the ranked combinations and underlying discount agreements. Deliverable: feasible actions and exclusions.
3. Analyst: compare like product/country/month groups across discount bands and segments, retaining sample counts. Treat comparisons as diagnostic, not experimental.
4. Sponsor: approve a limited test only after an evaluation design, baseline, comparison group where feasible, and stop criteria are agreed.
5. Evaluate weighted margin, reported profit, units, and net sales. Source retention and contract-compliance measures from operational systems before testing. Agree thresholds and duration before launch; none are invented here.

## Reproduce and inspect
SQL lives in `sql/investigation/`; detailed outputs in `investigation.json` and the browser-friendly `investigation.html`. The data-quality report is `data-quality.md`. Monthly changes are descriptive and are not seasonally adjusted. Cross-segment product comparisons do not match customers or contracts. All results use the historical source as supplied.
