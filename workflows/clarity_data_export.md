# Clarity Data Export Workflow

## Objective
Pull analytics data from Microsoft Clarity's Data Export API for analysis or delivery to cloud services.

## Prerequisites
- Active Clarity project with tracking script installed on the target website
- API token generated and stored in `.env` as `MS_CLARITY_API_TOKEN`
- Python dependencies installed (`pip install -r requirements.txt`)

## Tools
- `tools/clarity_connect.py` — Test connection to Clarity API

## API Details

### Endpoint
```
GET https://www.clarity.ms/export-data/api/v1/project-live-insights
```

### Parameters
| Parameter | Required | Values |
|-----------|----------|--------|
| numOfDays | Yes | 1, 2, or 3 (last 24/48/72 hours) |
| dimension1 | No | See dimensions below |
| dimension2 | No | See dimensions below |
| dimension3 | No | See dimensions below |

### Available Dimensions
Browser, Device, Country/Region, OS, Source, Medium, Campaign, Channel, URL

### Available Metrics
Scroll Depth, Engagement Time, Traffic, Popular Pages, Browser, Device, OS, Country/Region, Page Title, Referrer URL, Dead Click Count, Excessive Scroll, Rage Click Count, Quickback Click, Script Error Count, Error Click Count

## Constraints
- **10 requests/day** per project — plan calls carefully, don't waste on tests
- **1-3 days** of data only — no historical lookback
- **Max 3 dimensions** per request
- **Max 1,000 rows** per response, no pagination
- Results returned in **UTC timezone**
- If a call uses paid API credits, **check with the user before running**

## Error Handling
| Code | Meaning | Action |
|------|---------|--------|
| 401 | Unauthorized | Token is missing, invalid, or expired — regenerate |
| 403 | Forbidden | Token doesn't have permission — check project admin |
| 400 | Bad Request | Invalid parameters — check dimension names |
| 429 | Too Many Requests | Hit daily limit — wait until tomorrow |

## Execution Steps
1. Verify token is set: check `.env` for `MS_CLARITY_API_TOKEN`
2. Run `tools/clarity_connect.py` to confirm connection works
3. Use the `clarity_api` Python client to pull data with desired dimensions
4. Process/transform data as needed in `.tmp/`
5. Deliver final output to the appropriate cloud service
