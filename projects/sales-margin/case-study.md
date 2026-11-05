# Sales and margin review — executive case study

Independent demonstration using Microsoft's financial sample. Fictional consulting brief; no client engagement or realized improvement is claimed.

## Business decision
Where should a commercial manager investigate margin pressure before changing discount policy?

## Scope and evidence
Analyzed 700 sample records dated 2013-09-01 through 2014-12-01. Records are source observations, not verified individual orders or customers. The data is a multi-country, multi-segment financial sample, not an observed online store. Monetary values follow the sample's dollar presentation; currency conversion is not documented.

## Findings
- Net sales: $118,726,350; reported profit: $16,893,702; weighted margin: 14.2%.
- Discounts total $9,205,248, or 7.2% of gross sales.
- Channel Partners has the highest segment margin (73.1%); Enterprise has the lowest (-3.1%), with reported profit of $-614,546.
- 58 records have negative reported profit. Their combined loss magnitude is $777,321; this is not recoverable savings.

## Recommendation
Start a pricing and cost review in Enterprise. Validate cost allocation and contractual commitments before changing prices. Review loss-making product/segment combinations and compare discount bands within comparable products, markets, and periods. Aggregate discount comparisons are descriptive and do not establish that discounts caused low margins.

## Proposed validation and rollout
1. Confirm cost definitions, currency treatment, and the meaning of one record with a finance stakeholder.
2. Review contracts and customer context with a sales stakeholder; neither interview was conducted for this demonstration.
3. Test an approved discount-policy change in a limited, comparable group; select the evaluation design and duration before launch.
4. Monitor weighted margin, profit, net sales, units, and customer retention where available. Set explicit guardrails with the sponsor.

## Limitations
No customer identifiers, returns, shipping, marketing spend, operating expenses, or contract details are available. Reported profit is sales less COGS, not net business income. The years have unequal month coverage, so annual totals must not be presented as like-for-like growth. No causal effect, savings, or client result has been measured.

## Reproducibility
See README.md, sql/analysis.sql, and reports/results.json. Source SHA-256: `c3f17156ab7c192571ecfc742e88c16a4b7243a4d4b4a420fcb68dec44e10196`. Schema, completeness, row accounting identities, aggregate reconciliation passed. Exact duplicate rows: 0; duplicates are reported, not automatically removed because no source key proves duplication.

## Detailed investigation
See [Enterprise investigation](enterprise-investigation.md) for product/country loss concentration, monthly persistence, comparable-period analysis, options, and the proposed measurement plan. [Browse the evidence tables](investigation.html) and [data-quality report](data-quality.md).
