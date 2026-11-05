# Data-quality report

Checks are executed on the workbook before analysis. Warnings require interpretation; they do not silently remove records. Financial reconciliation checks measure internal consistency, not real-world accuracy. No business transaction key or external financial control is provided.

| Check | Status | Exceptions | Interpretation |
|---|---|---:|---|
| Expected schema | PASS | 0 | Trim header whitespace; require the documented 16-column schema. |
| Nonempty source | PASS | 0 | At least one source observation is required. |
| Blank source rows | PASS | 0 | Blank rows excluded; retained records are otherwise preserved. |
| Missing cells | PASS | 0 | All supplied fields are required for this source contract. |
| Exact duplicate rows | PASS | 0 | No transaction key proves duplication; report and retain. |
| Numeric types and finite values | PASS | 0 | Units and financial fields must contain finite numbers. |
| Date types | PASS | 0 | Date must be parsed as an Excel datetime. |
| Gross less discounts reconciles to sales | PASS | 0 | Tolerance less than 0.02 source monetary units per observation. |
| Sales less COGS reconciles to profit | PASS | 0 | Tolerance less than 0.02 source monetary units per observation. |
| Negative units or cost inputs | PASS | 0 | Investigate adjustments; do not automatically delete. |
| Discounts above gross sales | PASS | 0 | Investigate commercial context. |
| Date attributes match | PASS | 0 | Year, month number, and month name must agree with Date. |
| Full year coverage | WARN | 1 | Month counts by year: {'2013': 4, '2014': 12}. Partial years must not be compared as full years. |
