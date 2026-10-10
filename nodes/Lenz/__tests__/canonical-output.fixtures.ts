// What a version 1.3 node returned in 0.9.0 (before the node stopped reading
// the older API shape) for each case in ./canonical-bodies.fixtures.ts:
// `ok`, the items with Continue On Fail on (null when it threw), `threw`,
// the message it threw with Continue On Fail on, and `thrown`, what a
// workflow shows for a refusal with Continue On Fail off. Frozen:
// canonical-output.test.ts holds every node version to it, byte for byte.
/* eslint-disable */
export const canonicalOutput: Record<
	string,
	{
		ok: any[] | null;
		threw: string | null;
		thrown: { message: string; description: string | null; httpCode: string | null } | null;
	}
> = {
 "account__me_usage_extra_credits": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 350,
     "used": 0,
     "remaining": 350,
     "extra": 250,
     "bonus": 250,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 35,
     "quota_remaining": 35,
     "bonus": 25,
     "credits": 25,
     "remaining": 35
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 350,
     "quota_remaining": 350,
     "bonus": 250,
     "credits": 250,
     "remaining": 350
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 350,
     "quota_remaining": 350,
     "bonus": 250,
     "credits": 250,
     "remaining": 350
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_extra_only": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 137,
     "used": 100,
     "remaining": 37,
     "extra": 37,
     "bonus": 37,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 10,
     "quota_total": 13,
     "quota_remaining": 3,
     "bonus": 3,
     "credits": 3,
     "remaining": 3
    },
    "ask": {
     "quota_used": 100,
     "quota_total": 137,
     "quota_remaining": 37,
     "bonus": 37,
     "credits": 37,
     "remaining": 37
    },
    "assess": {
     "quota_used": 100,
     "quota_total": 137,
     "quota_remaining": 37,
     "bonus": 37,
     "credits": 37,
     "remaining": 37
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_extract_calls": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 100,
     "used": 0,
     "remaining": 100,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 10,
     "quota_remaining": 10,
     "bonus": 0,
     "credits": 0,
     "remaining": 10
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "extract": {
     "calls_today": 7,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_free": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 100,
     "used": 0,
     "remaining": 100,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 10,
     "quota_remaining": 10,
     "bonus": 0,
     "credits": 0,
     "remaining": 10
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_free_partly_spent": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 100,
     "used": 17,
     "remaining": 83,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 2,
     "quota_total": 10,
     "quota_remaining": 8,
     "bonus": 0,
     "credits": 0,
     "remaining": 8
    },
    "ask": {
     "quota_used": 17,
     "quota_total": 100,
     "quota_remaining": 83,
     "bonus": 0,
     "credits": 0,
     "remaining": 83
    },
    "assess": {
     "quota_used": 17,
     "quota_total": 100,
     "quota_remaining": 83,
     "bonus": 0,
     "credits": 0,
     "remaining": 83
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_oauth": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 100,
     "used": 0,
     "remaining": 100,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 10,
     "quota_remaining": 10,
     "bonus": 0,
     "credits": 0,
     "remaining": 10
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_plus": {
  "ok": [
   {
    "plan": "plus",
    "plan_label": "Plus",
    "quota_resets_at": "2026-09-01T10:00:00.000000+00:00",
    "credits": {
     "total": 500,
     "used": 0,
     "remaining": 500,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00.000000+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 50,
     "quota_remaining": 50,
     "bonus": 0,
     "credits": 0,
     "remaining": 50
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 500,
     "quota_remaining": 500,
     "bonus": 0,
     "credits": 0,
     "remaining": 500
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 500,
     "quota_remaining": 500,
     "bonus": 0,
     "credits": 0,
     "remaining": 500
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_pro": {
  "ok": [
   {
    "plan": "pro",
    "plan_label": "Pro",
    "quota_resets_at": "2026-09-01T10:00:00.000000+00:00",
    "credits": {
     "total": 5000,
     "used": 0,
     "remaining": 5000,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00.000000+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 500,
     "quota_remaining": 500,
     "bonus": 0,
     "credits": 0,
     "remaining": 500
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 5000,
     "quota_remaining": 5000,
     "bonus": 0,
     "credits": 0,
     "remaining": 5000
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 5000,
     "quota_remaining": 5000,
     "bonus": 0,
     "credits": 0,
     "remaining": 5000
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_pro_extra": {
  "ok": [
   {
    "plan": "pro",
    "plan_label": "Pro",
    "quota_resets_at": "2026-09-01T10:00:00.000000+00:00",
    "credits": {
     "total": 6000,
     "used": 0,
     "remaining": 6000,
     "extra": 1000,
     "bonus": 1000,
     "resets_at": "2026-09-01T10:00:00.000000+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 600,
     "quota_remaining": 600,
     "bonus": 100,
     "credits": 100,
     "remaining": 600
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 6000,
     "quota_remaining": 6000,
     "bonus": 1000,
     "credits": 1000,
     "remaining": 6000
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 6000,
     "quota_remaining": 6000,
     "bonus": 1000,
     "credits": 1000,
     "remaining": 6000
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__me_usage_stale_quota_row": {
  "ok": [
   {
    "plan": "free",
    "plan_label": "Free",
    "quota_resets_at": "2026-09-01T10:00:00+00:00",
    "credits": {
     "total": 100,
     "used": 0,
     "remaining": 100,
     "extra": 0,
     "bonus": 0,
     "resets_at": "2026-09-01T10:00:00+00:00"
    },
    "costs": {
     "verify": 10,
     "assess": 1,
     "ask": 1,
     "citation": 1,
     "extract": 0
    },
    "cost_options": {
     "verify": {
      "depth": {
       "standard": 10,
       "low": 5
      }
     }
    },
    "verify": {
     "quota_used": 0,
     "quota_total": 10,
     "quota_remaining": 10,
     "bonus": 0,
     "credits": 0,
     "remaining": 10
    },
    "ask": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "assess": {
     "quota_used": 0,
     "quota_total": 100,
     "quota_remaining": 100,
     "bonus": 0,
     "credits": 0,
     "remaining": 100
    },
    "extract": {
     "calls_today": 0,
     "daily_limit": 1000,
     "unlimited": false
    },
    "has_webhook_secret": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "account__webhook_secret_oauth": {
  "ok": null,
  "threw": "An API key's webhook secret is set and shown on https://lenz.io/api-credentials, not over the API. Get Webhook Secret is for OAuth connections.",
  "thrown": null
 },
 "assess__401_no_key": {
  "ok": [
   {
    "error": "Authorization failed - please check your credentials",
    "status_code": 401
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Authorization failed - please check your credentials",
   "description": "Unauthorized",
   "httpCode": "401"
  }
 },
 "assess__402_no_credits": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining /assess units.",
    "error_description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining /assess units.",
   "description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "assess__422_blank_item": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "blank_item"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "claims[1] is blank.",
   "httpCode": "422"
  }
 },
 "assess__422_blank_text": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Text is required.",
   "httpCode": "422"
  }
 },
 "assess__422_input_conflict": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "input_conflict"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Send either `claim` (one text) or `claims` (a list of claims), not both.",
   "httpCode": "422"
  }
 },
 "assess__422_item_too_long": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "item_too_long"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "claims[1] is 2001 characters; each claim may be at most 2000. Send a document to /extract first, then assess its claims.",
   "httpCode": "422"
  }
 },
 "assess__422_no_input_field": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "assess__422_too_many_items": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "too_many_items"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "At most 20 claims per call; got 21. Split the list.",
   "httpCode": "422"
  }
 },
 "assess__422_wrong_type_claim": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Input should be a valid string",
   "httpCode": "422"
  }
 },
 "assess__422_wrong_type_claims": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Input should be a valid list",
   "httpCode": "422"
  }
 },
 "assess__502_framing_failed": {
  "ok": [
   {
    "error": "Bad gateway - the service failed to handle your request",
    "status_code": 502,
    "code": "framing_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Bad gateway - the service failed to handle your request",
   "description": "framing_failed",
   "httpCode": "502"
  }
 },
 "assess__503_capacity": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "retry_after": 100,
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~100s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~100s before submitting again: send this node's error output into a Wait node set to 100 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~100s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~100s before submitting again: send this node's error output into a Wait node set to 100 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "assess__503_list_all_upstream_unavailable": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "upstream_unavailable",
    "retry_after": 90,
    "error_message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "assess__503_upstream_unavailable": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "upstream_unavailable",
    "retry_after": 90,
    "error_message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "assess__deep_tier_hit": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Water boils at 100C.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": "https://lenz.io/api/v1/verifications/b452a842",
      "rationale": "The claim is verified."
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__idempotency_body_mismatch": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Idempotency-Key reused with a different request body.",
   "httpCode": "422"
  }
 },
 "assess__idempotency_first": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "The Earth orbits the Sun.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__idempotency_replay": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "The Earth orbits the Sun.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__list_all_error_rows": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": true,
    "claims": [
     {
      "claim": "hi",
      "verdict": "Error",
      "confidence": "low",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "hello",
      "verdict": "Error",
      "confidence": "low",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__list_compound_item": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Primary claim.",
      "verdict": "Mostly False",
      "confidence": "high",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "A plain claim.",
      "verdict": "Mostly False",
      "confidence": "high",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__list_mixed_rows": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Water boils at 100 C at sea level.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "hello there",
      "verdict": "Error",
      "confidence": "low",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "vendor is down",
      "verdict": "Error",
      "confidence": "low",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "cannot frame",
      "verdict": "Error",
      "confidence": "low",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__memo_hit": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "The Danube flows through Vienna.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": "The river runs through the city."
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__single_no_claim": {
  "ok": [
   {
    "status": "no_claim",
    "message": "No verifiable claim detected",
    "candidate_claims": [],
    "not_a_claim": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__single_one_claim": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "The registry reported 4,200 filings in 2024.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": "The registry lists 4,200 filings for 2024 and has not revised the figure."
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__single_text_over_wave_more_claims": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Claim number 0 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 1 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 2 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 3 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 4 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 5 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 6 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 7 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 8 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 9 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 10 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 11 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 12 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 13 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 14 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 15 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 16 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 17 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 18 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "Claim number 19 is documented.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__single_text_several_claims": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Water boils at 100 C at sea level.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "The Moon is made of cheese.",
      "verdict": "False",
      "confidence": "high",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": null
     },
     {
      "claim": "The Pacific is the deepest ocean.",
      "verdict": "Mostly True",
      "confidence": "medium",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": null
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "assess__suggest_rewrite": {
  "ok": [
   {
    "status": "ok",
    "not_a_claim": false,
    "claims": [
     {
      "claim": "Venus is the closest planet to the Sun.",
      "verdict": "False",
      "confidence": "high",
      "passed": false,
      "language": "en",
      "verification_url": null,
      "rationale": "Mercury, not Venus, is the closest planet to the Sun."
     },
     {
      "claim": "Mercury is the closest planet to the Sun.",
      "verdict": "True",
      "confidence": "high",
      "passed": true,
      "language": "en",
      "verification_url": null,
      "rationale": "Mercury is the innermost planet."
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__402_no_credits": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 100,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining credits for citation checks.",
    "error_description": "This call costs 1 credit and you have 100 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining credits for citation checks.",
   "description": "This call costs 1 credit and you have 100 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "citecheck__429_citecheck_in_flight": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "citecheck_in_flight",
    "retry_after": 60,
    "error_message": "Lenz: this account already has 3 citation checks running \u2014 retry when one finishes.",
    "error_description": "HTTP 429 (citecheck_in_flight). Nothing was charged. Lenz runs at most 3 citation checks at a time per account; this is not a plan limit. The node waited for a slot and none opened in time. Send fewer items through at once, or send this node's error output into a Wait node with Wait Amount 60 and Wait Unit set to Seconds (it defaults to Hours), then loop it back."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: this account already has 3 citation checks running \u2014 retry when one finishes.",
   "description": "HTTP 429 (citecheck_in_flight). Nothing was charged. Lenz runs at most 3 citation checks at a time per account; this is not a plan limit. The node waited for a slot and none opened in time. Send fewer items through at once, or send this node's error output into a Wait node with Wait Amount 60 and Wait Unit set to Seconds (it defaults to Hours), then loop it back.",
   "httpCode": "429"
  }
 },
 "citecheck__503_capacity": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "retry_after": 90,
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "citecheck__503_citations_unavailable": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "citations_unavailable",
    "retry_after": 300,
    "error_message": "Lenz: citation checking is switched off for a moment \u2014 retry in ~300s.",
    "error_description": "Transient (HTTP 503, code: citations_unavailable). Nothing was charged. Wait ~300s before submitting again: send this node's error output into a Wait node set to 300 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: citation checking is switched off for a moment \u2014 retry in ~300s.",
   "description": "Transient (HTTP 503, code: citations_unavailable). Nothing was charged. Wait ~300s before submitting again: send this node's error output into a Wait node set to 300 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "citecheck__get_checking": {
  "ok": [
   {
    "passed": null,
    "citecheck_id": "5dc3d994",
    "status": "checking",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "poll_after_seconds": 10,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 0
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "pending",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "pending",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_clean": {
  "ok": [
   {
    "passed": true,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_doi_pair": {
  "ok": [
   {
    "passed": true,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 1
    },
    "summary": {
     "citations_found": 1,
     "citations_selected": 1,
     "citation_limit": 1,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 1,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 1
    },
    "citations": [
     {
      "index": 0,
      "reference": "10.1038/nature12373",
      "cited_url": "https://doi.org/10.1038/nature12373",
      "doi": "10.1038/nature12373",
      "statement": "Diamond sensors measure heat in cells.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at None",
       "page_published_date": null,
       "page_language": "en",
       "source_url": null,
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_incomplete": {
  "ok": [
   {
    "passed": false,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 1,
      "unchecked": 0,
      "failed": 1
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 1
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "failed",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": "The check failed on our side. Try again later.",
       "failure": {
        "code": "internal",
        "detail": "The check failed on our side.",
        "hint": "The check failed on our side. Try again later.",
        "failure_class": "internal",
        "retryable": false,
        "docs_url": "https://lenz.io/docs/errors#internal",
        "failure_reason": "internal"
       },
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [
     {
      "citation_index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "failure": {
       "code": "internal",
       "detail": "The check failed on our side.",
       "hint": "The check failed on our side. Try again later.",
       "failure_class": "internal",
       "retryable": false,
       "docs_url": "https://lenz.io/docs/errors#internal",
       "failure_reason": "internal"
      }
     }
    ],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_issues_found": {
  "ok": [
   {
    "passed": false,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 20
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 1,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "contradicted",
       "source": "support",
       "is_issue": true
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "contradicted",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [
     {
      "citation_index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "finding": "contradicted",
      "source": "support",
      "snippet": "The source says so.",
      "rationale": "The page states it.",
      "metadata_differences": [],
      "missing_quote": null,
      "page_title": "Page at https://example.gov/report-2024",
      "failure": null
     }
    ],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_partly_supported": {
  "ok": [
   {
    "passed": true,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "partly_supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "partly_supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_completed_unchecked": {
  "ok": [
   {
    "passed": false,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 2,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 0
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "unchecked",
       "source": null,
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "unchecked",
       "snippet": null,
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": "no_text",
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "https://example.org/statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": null,
      "result": {
       "finding": "unchecked",
       "source": null,
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "unchecked",
       "snippet": null,
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": "no_text",
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_failed_no_citations": {
  "ok": [
   {
    "passed": null,
    "citecheck_id": "5dc3d994",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 20
    },
    "summary": {
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": 20,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "citations": [],
    "citation_issues": [],
    "citation_failures": [],
    "failure": {
     "code": "no_citations",
     "detail": "The text holds no citation to check.",
     "hint": "The text has no citation to check: no link, DOI or numbered reference with one.",
     "failure_class": "invalid_input",
     "retryable": false,
     "docs_url": "https://lenz.io/docs/errors#invalid-input",
     "failure_reason": "no_citations"
    },
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_failed_upstream_unavailable": {
  "ok": [
   {
    "passed": null,
    "citecheck_id": "5dc3d994",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 20
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 0,
      "failed": 2
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 0
    },
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": null,
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "failed",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": "Lenz could not reach this source just now. Try again later.",
       "failure": {
        "code": "upstream_unavailable",
        "detail": "A service the check depends on was unavailable.",
        "hint": "Lenz could not reach this source just now. Try again later.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
        "failure_reason": "upstream_unavailable"
       },
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": null,
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "failed",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": "Lenz could not reach this source just now. Try again later.",
       "failure": {
        "code": "upstream_unavailable",
        "detail": "A service the check depends on was unavailable.",
        "hint": "Lenz could not reach this source just now. Try again later.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
        "failure_reason": "upstream_unavailable"
       },
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [
     {
      "citation_index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "Lenz could not reach this source just now. Try again later.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     },
     {
      "citation_index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "Lenz could not reach this source just now. Try again later.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     }
    ],
    "failure": {
     "code": "upstream_unavailable",
     "detail": "A service the check depends on was unavailable.",
     "hint": null,
     "failure_class": "upstream_unavailable",
     "retryable": true,
     "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
     "failure_reason": "upstream_unavailable"
    },
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_queued": {
  "ok": [
   {
    "passed": null,
    "citecheck_id": "5dc3d994",
    "status": "queued",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "poll_after_seconds": 10,
    "policy": {
     "max_citations": 1
    },
    "summary": {
     "citations_found": 1,
     "citations_selected": 1,
     "citation_limit": 1,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 0
    },
    "citations": [
     {
      "index": 0,
      "reference": "https://example.gov/report-2024",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024.",
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "pending",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_text_limit_exactly_at_limit": {
  "ok": [
   {
    "passed": true,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 2
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__get_text_limit_reached": {
  "ok": [
   {
    "passed": true,
    "citecheck_id": "5dc3d994",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "poll_after_seconds": null,
    "policy": {
     "max_citations": 1
    },
    "summary": {
     "citations_found": 2,
     "citations_selected": 1,
     "citation_limit": 1,
     "citation_limit_exceeded": true,
     "citation_checks": {
      "checked": 1,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citation_limit_reached": true
    },
    "credits": {
     "charged": 1
    },
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_citations": [
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "sentence": "The agency said so in a statement.",
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      }
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__idempotency_body_mismatch_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "idempotency_body_mismatch"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Idempotency-Key reused with a different request body.",
   "httpCode": "422"
  }
 },
 "citecheck__idempotency_conflict_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "idempotency_conflict",
    "error_message": "Lenz: this request is still being processed from an earlier attempt.",
    "error_description": "HTTP 409 (idempotency_conflict). Nothing new was charged. An earlier attempt of this exact request is still holding it, for up to 15 minutes; it may still be running, or it may have failed. The node already retried for ~30 seconds, and automatic retries are spaced too closely to outlast the hold. Check your Lenz account for the job before sending this input again: a new or re-run execution counts as a new request and would be charged again if the first went through."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: this request is still being processed from an earlier attempt.",
   "description": "HTTP 409 (idempotency_conflict). Nothing new was charged. An earlier attempt of this exact request is still holding it, for up to 15 minutes; it may still be running, or it may have failed. The node already retried for ~30 seconds, and automatic retries are spaced too closely to outlast the hold. Check your Lenz account for the job before sending this input again: a new or re-run execution counts as a new request and would be charged again if the first went through.",
   "httpCode": "409"
  }
 },
 "citecheck__idempotent_replay_202": {
  "ok": [
   {
    "status": "queued",
    "citecheck_id": "5dc3d994",
    "message": "Submitted. Fetch it with Get Citation Check using this citecheck_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__receipt_202": {
  "ok": [
   {
    "status": "queued",
    "citecheck_id": "5dc3d994",
    "message": "Submitted. Fetch it with Get Citation Check using this citecheck_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "citecheck__receipt_202_empty_webhook_url": {
  "ok": [
   {
    "status": "queued",
    "citecheck_id": "5dc3d994",
    "message": "Submitted. Fetch it with Get Citation Check using this citecheck_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "errors__ask_empty_message": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Message cannot be empty.",
   "httpCode": "422"
  }
 },
 "errors__ask_failed": {
  "ok": [
   {
    "error": "Bad gateway - the service failed to handle your request",
    "status_code": 502,
    "code": "ask_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Bad gateway - the service failed to handle your request",
   "description": "ask_failed",
   "httpCode": "502"
  }
 },
 "errors__ask_not_completed": {
  "ok": [
   {
    "error": "Bad request - please check your parameters",
    "status_code": 400
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Bad request - please check your parameters",
   "description": "Ask is only available for completed verifications.",
   "httpCode": "400"
  }
 },
 "errors__auth_bad_key": {
  "ok": [
   {
    "error": "Authorization failed - please check your credentials",
    "status_code": 401
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Authorization failed - please check your credentials",
   "description": "Unauthorized",
   "httpCode": "401"
  }
 },
 "errors__auth_insufficient_scope": {
  "ok": [
   {
    "error": "Forbidden - perhaps check your credentials?",
    "status_code": 403,
    "code": "insufficient_scope"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Forbidden - perhaps check your credentials?",
   "description": "The access token does not allow this call.",
   "httpCode": "403"
  }
 },
 "errors__not_found_verification": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "errors__not_found_verify_status": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Task not found.",
   "httpCode": "404"
  }
 },
 "errors__payment_required_ask": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining ask credits.",
    "error_description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining ask credits.",
   "description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "errors__payment_required_assess": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining /assess units.",
    "error_description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining /assess units.",
   "description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "errors__payment_required_verify": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 10,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining claim checks.",
    "error_description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining claim checks.",
   "description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "errors__payment_required_verify_batch_short": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 50,
    "credits_remaining": 30,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: Insufficient credits for batch.",
    "error_description": "This call costs 50 credits and you have 30 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Insufficient credits for batch.",
   "description": "This call costs 50 credits and you have 30 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "errors__rate_limited_extract": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "extract_daily_limit",
    "resets_in_seconds": 900,
    "limit": 1000,
    "upgrade_url": "https://lenz.io/plans",
    "error_message": "Lenz: Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website. Resets in ~15 minutes.",
    "error_description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~15 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website. Resets in ~15 minutes.",
   "description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~15 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans.",
   "httpCode": "429"
  }
 },
 "errors__service_unavailable_ask": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "upstream_unavailable",
    "retry_after": 90,
    "error_message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "errors__service_unavailable_capacity": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "retry_after": 60,
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~60s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~60s before submitting again: send this node's error output into a Wait node set to 60 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~60s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~60s before submitting again: send this node's error output into a Wait node set to 60 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "errors__validation_missing_field_hint": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "errors__validation_wrong_type": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Input should be a valid string",
   "httpCode": "422"
  }
 },
 "errors__web_review_rate_limited": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "extract_daily_limit",
    "resets_in_seconds": 777,
    "limit": 1000,
    "upgrade_url": "https://lenz.io/plans",
    "error_message": "Lenz: This account has used its extractions for today. The daily allowance is shared with the Lenz API. It resets at 00:00 UTC. Resets in ~13 minutes.",
    "error_description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~13 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: This account has used its extractions for today. The daily allowance is shared with the Lenz API. It resets at 00:00 UTC. Resets in ~13 minutes.",
   "description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~13 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans.",
   "httpCode": "429"
  }
 },
 "extract__401_no_key": {
  "ok": [
   {
    "error": "Authorization failed - please check your credentials",
    "status_code": 401
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Authorization failed - please check your credentials",
   "description": "Unauthorized",
   "httpCode": "401"
  }
 },
 "extract__422_blank_text": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Text is required.",
   "httpCode": "422"
  }
 },
 "extract__422_focus_too_long": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "focus must be at most 300 characters of plain text.",
   "httpCode": "422"
  }
 },
 "extract__422_missing_text": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "extract__429_daily_limit": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "extract_daily_limit",
    "resets_in_seconds": 3600,
    "limit": 1000,
    "upgrade_url": "https://lenz.io/plans",
    "error_message": "Lenz: Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website. Resets in ~60 minutes.",
    "error_description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~60 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website. Resets in ~60 minutes.",
   "description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. That is too long to wait inside a workflow: the execution would stay pending for ~60 minutes, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. Re-run the workflow after the reset, or schedule it for then, or raise the cap: https://lenz.io/plans.",
   "httpCode": "429"
  }
 },
 "extract__502_extraction_failed": {
  "ok": [
   {
    "error": "Bad gateway - the service failed to handle your request",
    "status_code": 502,
    "code": "extraction_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Bad gateway - the service failed to handle your request",
   "description": "extraction_failed",
   "httpCode": "502"
  }
 },
 "extract__503_upstream_unavailable": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "upstream_unavailable",
    "retry_after": 90,
    "error_message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "extract__focus_ready": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Beta fell 3% last year.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Beta fell 3% last year.",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__idempotency_body_mismatch_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Idempotency-Key reused with a different request body.",
   "httpCode": "422"
  }
 },
 "extract__idempotency_replay": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": null
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [
     "Alpha rose 5% in 2024.",
     "Beta fell 3% last year."
    ],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__locate_all_dropped": {
  "ok": [
   {
    "status": "not_a_claim",
    "claims": [],
    "domain": "",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__locate_failed": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": null
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [
     "Alpha rose 5% in 2024.",
     "Beta fell 3% last year."
    ],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__locate_leading_whitespace": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 3,
        "end": 25,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 3,
        "end": 25,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     }
    ],
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__locate_some_dropped": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 0,
        "end": 22,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": [
       {
        "start": 23,
        "end": 46,
        "text": "Beta fell 3% last year."
       }
      ]
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [
     "Alpha rose 5% in 2024.",
     "Beta fell 3% last year."
    ],
    "candidate_claims": [],
    "locations": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 0,
        "end": 22,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": [
       {
        "start": 23,
        "end": 46,
        "text": "Beta fell 3% last year."
       }
      ]
     }
    ],
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__locate_true": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 0,
        "end": 22,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": [
       {
        "start": 23,
        "end": 46,
        "text": "Beta fell 3% last year."
       }
      ]
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [
     "Alpha rose 5% in 2024.",
     "Beta fell 3% last year."
    ],
    "candidate_claims": [],
    "locations": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": 0,
        "end": 22,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": [
       {
        "start": 23,
        "end": 46,
        "text": "Beta fell 3% last year."
       }
      ]
     }
    ],
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__no_match_with_focus": {
  "ok": [
   {
    "status": "no_match",
    "claims": [],
    "domain": "",
    "key_entities": [],
    "presumed_intent": "",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false,
    "message": "Claims were found, but none fall within the focus. Widen or reword it and run again \u2014 the unfocused claims are deliberately not substituted."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__not_a_claim": {
  "ok": [
   {
    "status": "not_a_claim",
    "claims": [],
    "domain": "",
    "key_entities": [],
    "presumed_intent": "",
    "original_input": "What a lovely day.",
    "claim": "",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__not_a_claim_beside_claims": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__ready_one_claim": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__ready_several_claims": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": null
     },
     {
      "claim": "Beta fell 3% last year.",
      "positions": null
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [
     "Alpha rose 5% in 2024.",
     "Beta fell 3% last year."
    ],
    "candidate_claims": [],
    "locations": null,
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "extract__url_fetch_502_unreadable": {
  "ok": [
   {
    "error": "Bad gateway - the service failed to handle your request",
    "status_code": 502,
    "code": "extraction_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Bad gateway - the service failed to handle your request",
   "description": "extraction_failed",
   "httpCode": "502"
  }
 },
 "extract__url_fetch_503_upstream": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "upstream_unavailable",
    "retry_after": 90,
    "error_message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz's model providers are temporarily unavailable \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: upstream_unavailable). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "extract__url_input_located": {
  "ok": [
   {
    "status": "ready",
    "claims": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": null,
        "end": null,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     }
    ],
    "domain": "Economics",
    "key_entities": [
     {
      "name": "Alpha",
      "type": "organization"
     },
     {
      "name": "Beta",
      "type": "organization"
     }
    ],
    "presumed_intent": "Verify reported figures",
    "original_input": "https://example.com/an-article",
    "claim": "Alpha rose 5% in 2024.",
    "identified_claims": [],
    "candidate_claims": [],
    "locations": [
     {
      "claim": "Alpha rose 5% in 2024.",
      "positions": [
       {
        "start": null,
        "end": null,
        "text": "Alpha rose 5% in 2024."
       }
      ]
     }
    ],
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__401_no_credentials": {
  "ok": [
   {
    "error": "Authorization failed - please check your credentials",
    "status_code": 401
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Authorization failed - please check your credentials",
   "description": "Unauthorized",
   "httpCode": "401"
  }
 },
 "review__402_no_credits": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 100,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining credits to assess the draft.",
    "error_description": "This call costs 1 credit and you have 100 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining credits to assess the draft.",
   "description": "This call costs 1 credit and you have 100 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "review__402_no_credits_exhausted": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 1,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining credits to assess the draft.",
    "error_description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining credits to assess the draft.",
   "description": "This call costs 1 credit and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "review__422_blank_text": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "text: send the draft, or one public http(s) URL.",
   "httpCode": "422"
  }
 },
 "review__422_citations_options_object": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.citations: Extra inputs are not permitted",
   "httpCode": "422"
  }
 },
 "review__422_depth_unknown": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.depth: Input should be 'standard' or 'low'",
   "httpCode": "422"
  }
 },
 "review__422_invalid_confidence_band": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "invalid_confidence_band"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.confidence: Unknown confidence band 'certain'; use low, medium or high.",
   "httpCode": "422"
  }
 },
 "review__422_invalid_verdict_label": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "invalid_verdict_label"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.verdicts: Unknown verdict label 'Misleading'; use one of: False, Mostly False, Mixed, Mostly True, True.",
   "httpCode": "422"
  }
 },
 "review__422_max_assessments_negative": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.max_assessments: Input should be greater than or equal to 0",
   "httpCode": "422"
  }
 },
 "review__422_max_citations_negative": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.max_citations: Input should be greater than or equal to 0",
   "httpCode": "422"
  }
 },
 "review__422_max_citations_too_big": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.max_citations: Input should be less than or equal to 20",
   "httpCode": "422"
  }
 },
 "review__422_max_verifications_too_big": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.max_verifications: Input should be less than or equal to 20",
   "httpCode": "422"
  }
 },
 "review__422_text_missing": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.text: Field required",
   "httpCode": "422"
  }
 },
 "review__422_text_wrong_type": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.text: Input should be a valid string",
   "httpCode": "422"
  }
 },
 "review__422_unknown_escalate_field": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.escalate.nope: Extra inputs are not permitted",
   "httpCode": "422"
  }
 },
 "review__422_unknown_top_level_field": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.max_verifications: Extra inputs are not permitted",
   "httpCode": "422"
  }
 },
 "review__422_unsupported_language": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "language: Unsupported language 'xx'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
   "httpCode": "422"
  }
 },
 "review__422_visibility_public": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "payload.visibility: Input should be 'private' or 'unlisted'",
   "httpCode": "422"
  }
 },
 "review__422_webhook_secret_missing": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "webhook_secret_missing"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "webhook_url was supplied but this credential has no webhook signing secret. Create one on the API credentials page (an API key) or read GET /me/webhook-secret (an OAuth connection), then resend.",
   "httpCode": "422"
  }
 },
 "review__429_extract_daily_limit": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "extract_daily_limit",
    "retry_after": 60,
    "limit": 1000,
    "upgrade_url": "https://lenz.io/plans",
    "error_message": "Lenz: Daily /extract limit of 1000 reached for this account. A review of a URL reads the page like /extract and counts as one /extract call. Resets in ~60s.",
    "error_description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. Wait ~60s and submit again: send this node's error output into a Wait node with Wait Amount {{ $json.retry_after }} and Wait Unit set to Seconds (it defaults to Hours), then loop it back."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Daily /extract limit of 1000 reached for this account. A review of a URL reads the page like /extract and counts as one /extract call. Resets in ~60s.",
   "description": "Rate limited (HTTP 429). Nothing was charged, and the stated limit is 1000. Wait ~60s and submit again: send this node's error output into a Wait node with Wait Amount {{ $json.retry_after }} and Wait Unit set to Seconds (it defaults to Hours), then loop it back.",
   "httpCode": "429"
  }
 },
 "review__429_review_in_flight": {
  "ok": [
   {
    "error": "The service is receiving too many requests from you",
    "status_code": 429,
    "code": "review_in_flight",
    "retry_after": 60,
    "error_message": "Lenz: this account already has 3 reviews running \u2014 retry when one finishes.",
    "error_description": "HTTP 429 (review_in_flight). Nothing was charged. Lenz runs at most 3 reviews at a time per account; this is not a plan limit. The node waited for a slot and none opened in time. Send fewer items through at once, or send this node's error output into a Wait node with Wait Amount 60 and Wait Unit set to Seconds (it defaults to Hours), then loop it back."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: this account already has 3 reviews running \u2014 retry when one finishes.",
   "description": "HTTP 429 (review_in_flight). Nothing was charged. Lenz runs at most 3 reviews at a time per account; this is not a plan limit. The node waited for a slot and none opened in time. Send fewer items through at once, or send this node's error output into a Wait node with Wait Amount 60 and Wait Unit set to Seconds (it defaults to Hours), then loop it back.",
   "httpCode": "429"
  }
 },
 "review__503_capacity": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "retry_after": 90,
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "review__503_citations_capacity": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "retry_after": 90,
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "review__delete_not_a_route": {
  "ok": [
   {
    "error": "Method not allowed - please check you are using the right HTTP method",
    "status_code": 405,
    "code": "method_not_allowed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Method not allowed - please check you are using the right HTTP method",
   "description": "Method not allowed.",
   "httpCode": "405"
  }
 },
 "review__get_403_insufficient_scope": {
  "ok": [
   {
    "error": "Forbidden - perhaps check your credentials?",
    "status_code": 403,
    "code": "insufficient_scope"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Forbidden - perhaps check your credentials?",
   "description": "The access token does not allow this call.",
   "httpCode": "403"
  }
 },
 "review__get_404_not_found": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404,
    "code": "not_found"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Review not found.",
   "httpCode": "404"
  }
 },
 "review__get_404_other_account": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404,
    "code": "not_found"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Review not found.",
   "httpCode": "404"
  }
 },
 "review__get_410_purged": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 410,
    "code": "purged"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "This review is no longer available: its account removes content after a set period.",
   "httpCode": "410"
  }
 },
 "review__get_422_unknown_view": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "validation_error"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "view: use full or issues.",
   "httpCode": "422"
  }
 },
 "review__get_assessing": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "assessing",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 0,
      "failed": 0
     },
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": 10,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "running",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "running",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_assessment_rows_full_fields": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 0,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 1
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 1,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": null,
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "cap"
      },
      "key_finding": null,
      "rationale": "Two reviewers found the date wrong.",
      "suggested_rewrite": "The EU AI Act entered into force in August 2024.",
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [
     {
      "claim_index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "stage": "assessment",
      "failure": {
       "code": "timeout",
       "detail": "The check did not finish inside its time budget.",
       "hint": "The check ran out of time. Retry it; nothing was charged.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": null,
       "failure_reason": "timeout"
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "assessment",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": "Two reviewers found the date wrong.",
       "dissent": "One reviewer read the claim as about the entry into force.",
       "suggested_rewrite": "The EU AI Act entered into force in August 2024.",
       "more_claims": [
        "The EU AI Act took effect in 2024.",
        "It took effect in March."
       ],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": [
        "The EU AI Act took effect in 2024.",
        "It took effect in March."
       ]
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "cap"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "failed",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": {
        "code": "timeout",
        "detail": "The check did not finish inside its time budget.",
        "hint": "The check ran out of time. Retry it; nothing was charged.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": null,
        "failure_reason": "timeout"
       },
       "error_code": "timeout",
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_clean": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 3
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_failed_and_unchecked": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 1,
      "failed": 1
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [
     {
      "citation_index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "failure": {
       "code": "internal",
       "detail": "The check failed on our side.",
       "hint": "The check failed on our side. Try again later.",
       "failure_class": "internal",
       "retryable": false,
       "docs_url": "https://lenz.io/docs/errors#internal",
       "failure_reason": "internal"
      }
     }
    ],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": null,
      "check": {
       "status": "failed",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": "The check failed on our side. Try again later.",
       "failure": {
        "code": "internal",
        "detail": "The check failed on our side.",
        "hint": "The check failed on our side. Try again later.",
        "failure_class": "internal",
        "retryable": false,
        "docs_url": "https://lenz.io/docs/errors#internal",
        "failure_reason": "internal"
       },
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "unchecked",
       "source": null,
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "unchecked",
       "snippet": null,
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": "no_text",
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_issue_full": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 1,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 3
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [
     {
      "citation_index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "finding": "contradicted",
      "source": "support",
      "snippet": "The source says so.",
      "rationale": "The page states it.",
      "metadata_differences": [],
      "missing_quote": null,
      "page_title": "Page at https://example.gov/report-2024",
      "failure": null
     }
    ],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "contradicted",
       "source": "support",
       "is_issue": true
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "contradicted",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_issue_issues_view": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "issues",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 1,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 3
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [
     {
      "citation_index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "finding": "contradicted",
      "source": "support",
      "snippet": "The source says so.",
      "rationale": "The page states it.",
      "metadata_differences": [],
      "missing_quote": null,
      "page_title": "Page at https://example.gov/report-2024",
      "failure": null
     }
    ],
    "citation_failures": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_limit_exactly_at_limit": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 2,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 2,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 3
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_limit_reached": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 1,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 1,
     "citation_limit": 1,
     "citation_limit_exceeded": true,
     "citation_checks": {
      "checked": 1,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": true
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": [
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "sentence": "The agency said so in a statement.",
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      }
     }
    ]
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_no_claim_but_citations": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 0,
     "claims_selected": 0,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 0,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_no_claim_no_citation": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": null,
     "claims_selected": null,
     "claim_limit": 20,
     "claim_limit_exceeded": null,
     "input_truncated": false,
     "assessments": null,
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": 20,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": null,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [],
    "failure": {
     "code": "no_checkable_claim",
     "detail": "No claim in the input could be checked against public evidence.",
     "hint": "No factual statement that can be checked against evidence was found in the input. Send one factual claim, or run the text through /extract to enumerate its claims.",
     "failure_class": "invalid_input",
     "retryable": false,
     "docs_url": "https://lenz.io/docs/errors#invalid-input",
     "failure_reason": "no_claim"
    },
    "more_claims": null,
    "more_claim_locations": null,
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_not_asked": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_only": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 0,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 0,
     "claim_limit": 0,
     "claim_limit_exceeded": true,
     "input_truncated": false,
     "assessments": {
      "completed": 0,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": true,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [
     "The EU AI Act took effect in March 2024."
    ],
    "more_claim_locations": [
     {
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null
     }
    ],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_partly_supported": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 2,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 3
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": "Unemployment fell to 4.1% in 2024, according to a report from the ministry.",
      "quotes": [],
      "position": {
       "start": 0,
       "end": 110,
       "text": null
      },
      "result": {
       "finding": "partly_supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.gov/report-2024",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.gov/report-2024",
       "source_version": null,
       "support": "partly_supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": "The agency said so in a statement.",
      "quotes": [],
      "position": {
       "start": 111,
       "end": 178,
       "text": null
      },
      "result": {
       "finding": "supported",
       "source": "support",
       "is_issue": false
      },
      "check": {
       "status": "completed",
       "page_read": "full",
       "page_title": "Page at https://example.org/statement",
       "page_published_date": null,
       "page_language": "en",
       "source_url": "https://example.org/statement",
       "source_version": null,
       "support": "supported",
       "snippet": "The source says so.",
       "rationale": "The page states it.",
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_running": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "verifying",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": 2,
     "citations_selected": 2,
     "citation_limit": 20,
     "citation_limit_exceeded": false,
     "citation_checks": {
      "checked": 0,
      "unchecked": 0,
      "failed": 0
     },
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": false
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": 15,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [
     {
      "index": 0,
      "reference": "a report from the ministry",
      "cited_url": "https://example.gov/report-2024",
      "doi": null,
      "statement": null,
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "pending",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     },
     {
      "index": 1,
      "reference": "a statement",
      "cited_url": "https://example.org/statement",
      "doi": null,
      "statement": null,
      "quotes": [],
      "position": null,
      "result": null,
      "check": {
       "status": "pending",
       "page_read": null,
       "page_title": null,
       "page_published_date": null,
       "page_language": null,
       "source_url": null,
       "source_version": null,
       "support": null,
       "snippet": null,
       "rationale": null,
       "quote": null,
       "doi_registered": null,
       "metadata": null,
       "metadata_differences": [],
       "registered": null,
       "unchecked_reason": null,
       "hint": null,
       "failure": null,
       "missing_quote": null
      }
     }
    ],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_skipped_switched_off": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": 20,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": "switched_off",
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_citations_skipped_url_input": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 20,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": null,
     "claims_selected": null,
     "claim_limit": 20,
     "claim_limit_exceeded": null,
     "input_truncated": false,
     "assessments": null,
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": 20,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": "url_input",
     "claim_limit_reached": null,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [],
    "failure": {
     "code": "upstream_unavailable",
     "detail": "A service the check depends on was unavailable.",
     "hint": null,
     "failure_class": "upstream_unavailable",
     "retryable": true,
     "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
     "failure_reason": "upstream_unavailable"
    },
    "more_claims": null,
    "more_claim_locations": null,
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_claim_limit_not_reached": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 3,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 3,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_claim_limit_reached_exact": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 2,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 2,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": true,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_assess_only": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 0,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 1,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": null,
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "cap"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "assessment",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "cap"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_clean": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Paris is the capital of France.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_issues_all_verified": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 3,
     "claims_selected": 3,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 3,
      "failed": 0
     },
     "verifications": {
      "planned": 2,
      "completed": 2,
      "failed": 0
     },
     "issues": 2,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 23
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "467bdde5",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
      "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The EU AI Act took effect in March 2024.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The EU AI Act took effect in March 2024.",
      "failure": null,
      "suggested_edits": null
     },
     {
      "claim_index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "545628ac",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/545628ac",
      "url": "https://lenz.io/c/the-earth-is-round-545628ac",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The Eiffel Tower is in Berlin.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "Mostly False",
       "confidence": "medium",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "3078e347ea349335a08ba2a60271b032",
       "verification_id": "467bdde5",
       "claim": "The EU AI Act took effect in March 2024.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The EU AI Act took effect in March 2024.",
       "executive_summary": "Summary for The EU AI Act took effect in March 2024.",
       "suggested_rewrite": "Fixed: The EU AI Act took effect in March 2024.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
       "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "e2d16a8a325b3db21aeb6788312fb7ea",
       "verification_id": "545628ac",
       "claim": "The Eiffel Tower is in Berlin.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The Eiffel Tower is in Berlin.",
       "executive_summary": "Summary for The Eiffel Tower is in Berlin.",
       "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/545628ac",
       "url": "https://lenz.io/c/the-earth-is-round-545628ac",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     },
     {
      "index": 2,
      "claim": "Paris is the capital of France.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_issues_full": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 4,
     "claims_selected": 4,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 3,
      "failed": 1
     },
     "verifications": {
      "planned": 2,
      "completed": 1,
      "failed": 1
     },
     "issues": 2,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 13
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "467bdde5",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
      "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The EU AI Act took effect in March 2024.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The EU AI Act took effect in March 2024.",
      "failure": null,
      "suggested_edits": null
     },
     {
      "claim_index": 2,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": "failed",
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": {
       "code": "research_empty",
       "detail": "No sources about the claim were found.",
       "hint": null,
       "failure_class": "insufficient_evidence",
       "retryable": false,
       "docs_url": "https://lenz.io/docs/errors#insufficient-evidence",
       "failure_reason": "research_empty"
      },
      "suggested_edits": null
     }
    ],
    "failures": [
     {
      "claim_index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "stage": "assessment",
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "Mostly False",
       "confidence": "medium",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "3205b2ad235e43456aba8ec6c453d8fe",
       "verification_id": "467bdde5",
       "claim": "The EU AI Act took effect in March 2024.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The EU AI Act took effect in March 2024.",
       "executive_summary": "Summary for The EU AI Act took effect in March 2024.",
       "suggested_rewrite": "Fixed: The EU AI Act took effect in March 2024.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
       "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "failed",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": {
        "code": "upstream_unavailable",
        "detail": "A service the check depends on was unavailable.",
        "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
        "failure_reason": "upstream_unavailable"
       },
       "error_code": "upstream_unavailable",
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 2,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "assessment",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "verification_id": null,
       "task_id": "ec0340b28cc6c8a4a114dd563c1889ee",
       "claim": null,
       "language": null,
       "visibility": null,
       "depth": null,
       "domain": null,
       "entities": [],
       "verdict": null,
       "confidence": null,
       "lenz_score": null,
       "key_finding": null,
       "executive_summary": null,
       "suggested_rewrite": null,
       "warnings": [],
       "created_at": null,
       "completed_at": null,
       "verification_url": null,
       "url": null,
       "failure": {
        "code": "research_empty",
        "detail": "No sources about the claim were found.",
        "hint": null,
        "failure_class": "insufficient_evidence",
        "retryable": false,
        "docs_url": "https://lenz.io/docs/errors#insufficient-evidence",
        "failure_reason": "research_empty"
       },
       "status": "failed",
       "content_status": "available",
       "modified_at": null
      },
      "suggested_edits": null
     },
     {
      "index": 3,
      "claim": "Paris is the capital of France.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_issues_view_issues": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "issues",
    "status": "completed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 4,
     "claims_selected": 4,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 3,
      "failed": 1
     },
     "verifications": {
      "planned": 2,
      "completed": 1,
      "failed": 1
     },
     "issues": 2,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 13
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "467bdde5",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
      "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The EU AI Act took effect in March 2024.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The EU AI Act took effect in March 2024.",
      "failure": null,
      "suggested_edits": null
     },
     {
      "claim_index": 2,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": "failed",
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": {
       "code": "research_empty",
       "detail": "No sources about the claim were found.",
       "hint": null,
       "failure_class": "insufficient_evidence",
       "retryable": false,
       "docs_url": "https://lenz.io/docs/errors#insufficient-evidence",
       "failure_reason": "research_empty"
      },
      "suggested_edits": null
     }
    ],
    "failures": [
     {
      "claim_index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "stage": "assessment",
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_positions": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": [
       {
        "start": 0,
        "end": 40,
        "text": "The EU AI Act took effect in March 2024."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": [
       {
        "start": 55,
        "end": 89,
        "text": "Water boils at 100 C at sea level."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_recovered_claim": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "Orbit Motors stock increased by 40% in 2022.",
      "positions": [],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_completed_with_untraced_claim": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": [
       {
        "start": 0,
        "end": 40,
        "text": "The EU AI Act took effect in March 2024."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": [
       {
        "start": 50,
        "end": 84,
        "text": "Water boils at 100 C at sea level."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_during_quick_check": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "assessing",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 0,
      "failed": 0
     },
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": 10,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "running",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_failed_every_assessment_failed": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "failed",
    "outcome": "incomplete",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 0,
      "failed": 2
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "stage": "assessment",
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     },
     {
      "claim_index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "stage": "assessment",
      "failure": {
       "code": "upstream_unavailable",
       "detail": "A service the check depends on was unavailable.",
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "failure_reason": "upstream_unavailable"
      }
     }
    ],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "failed",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": {
        "code": "upstream_unavailable",
        "detail": "A service the check depends on was unavailable.",
        "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
        "failure_reason": "upstream_unavailable"
       },
       "error_code": "upstream_unavailable",
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": null,
      "assessment": {
       "status": "failed",
       "verdict": null,
       "confidence": null,
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": {
        "code": "upstream_unavailable",
        "detail": "A service the check depends on was unavailable.",
        "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
        "failure_class": "upstream_unavailable",
        "retryable": true,
        "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
        "failure_reason": "upstream_unavailable"
       },
       "error_code": "upstream_unavailable",
       "hint": null,
       "identified_claims": []
      },
      "escalation": null,
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": {
     "code": "assessment_failed",
     "detail": "No claim could be assessed.",
     "hint": "Retry the review with a new Idempotency-Key; nothing was charged.",
     "failure_class": "upstream_unavailable",
     "retryable": true,
     "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
     "failure_reason": "assessment_failed"
    },
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_failed_no_claim": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": null,
     "claims_selected": null,
     "claim_limit": 20,
     "claim_limit_exceeded": null,
     "input_truncated": false,
     "assessments": null,
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": null,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [],
    "failure": {
     "code": "no_checkable_claim",
     "detail": "No claim in the input could be checked against public evidence.",
     "hint": "The text is a greeting, not a statement about the world. Send one factual claim, or run the text through /extract to enumerate its claims.",
     "failure_class": "invalid_input",
     "retryable": false,
     "docs_url": "https://lenz.io/docs/errors#invalid-input",
     "failure_reason": "no_claim"
    },
    "more_claims": null,
    "more_claim_locations": null,
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_failed_no_claim_untraced": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "failed",
    "outcome": "unchecked",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": null,
     "claims_selected": null,
     "claim_limit": 20,
     "claim_limit_exceeded": null,
     "input_truncated": false,
     "assessments": null,
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": null,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [],
    "failure": {
     "code": "no_checkable_claim",
     "detail": "No claim in the input could be checked against public evidence.",
     "hint": "None of the claims found in the text could be traced back to it. Send one factual claim, or run the text through /extract to enumerate its claims.",
     "failure_class": "invalid_input",
     "retryable": false,
     "docs_url": "https://lenz.io/docs/errors#invalid-input",
     "failure_reason": "no_claim"
    },
    "more_claims": null,
    "more_claim_locations": null,
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_more_claims": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 2,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 3,
     "claims_selected": 2,
     "claim_limit": 2,
     "claim_limit_exceeded": true,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": true,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": [
       {
        "start": 0,
        "end": 40,
        "text": "The EU AI Act took effect in March 2024."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": [
       {
        "start": 50,
        "end": 84,
        "text": "Water boils at 100 C at sea level."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [
     "The Eiffel Tower is in Berlin."
    ],
    "more_claim_locations": [
     {
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": [
       {
        "start": 91,
        "end": 121,
        "text": "The Eiffel Tower is in Berlin."
       }
      ]
     }
    ],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_nested_verification_modified_at_crosses_midnight_by_minutes": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 1,
      "completed": 1,
      "failed": 0
     },
     "issues": 1,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 11
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "467bdde5",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
      "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The Eiffel Tower is in Berlin.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "3205b2ad235e43456aba8ec6c453d8fe",
       "verification_id": "467bdde5",
       "claim": "The Eiffel Tower is in Berlin.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The Eiffel Tower is in Berlin.",
       "executive_summary": "Summary for The Eiffel Tower is in Berlin.",
       "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
       "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_nested_verification_modified_at_same_day_hours_apart": {
  "ok": [
   {
    "passed": false,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "issues_found",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 1,
      "completed": 1,
      "failed": 0
     },
     "issues": 1,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 11
    },
    "poll_after_seconds": null,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "467bdde5",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
      "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The Eiffel Tower is in Berlin.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "3205b2ad235e43456aba8ec6c453d8fe",
       "verification_id": "467bdde5",
       "claim": "The Eiffel Tower is in Berlin.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The Eiffel Tower is in Berlin.",
       "executive_summary": "Summary for The Eiffel Tower is in Berlin.",
       "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/467bdde5",
       "url": "https://lenz.io/c/the-earth-is-round-467bdde5",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_policy_resolved": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 2,
     "depth": "low",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_queued": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "queued",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": null,
     "claims_selected": null,
     "claim_limit": 20,
     "claim_limit_exceeded": null,
     "input_truncated": false,
     "assessments": null,
     "verifications": null,
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": null,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 0
    },
    "poll_after_seconds": 10,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [],
    "citations": [],
    "failure": null,
    "more_claims": null,
    "more_claim_locations": null,
    "more_citations": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_suggested_edits": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "verifying",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "suggest_edits": true,
     "max_citations": 0
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 2,
      "completed": 1,
      "failed": 0
     },
     "issues": 2,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 12
    },
    "poll_after_seconds": 15,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "0f67b4fc",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/0f67b4fc",
      "url": "https://lenz.io/c/the-earth-is-round-0f67b4fc",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The Eiffel Tower is in Berlin.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
      "failure": null,
      "suggested_edits": {
       "status": "completed",
       "edits": [
        {
         "position": 0,
         "start": 23,
         "end": 29,
         "text": "Berlin",
         "replacement": "Paris"
        }
       ]
      }
     },
     {
      "claim_index": 1,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": "processing",
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": null,
      "suggested_edits": {
       "status": "pending",
       "edits": null
      }
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "positions": [
       {
        "start": 0,
        "end": 30,
        "text": "The Eiffel Tower is in Berlin."
       }
      ],
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "verification",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "completed",
       "content_status": "available",
       "task_id": "6298181fa8d3aebaf368cd8f3fc6dbfd",
       "verification_id": "0f67b4fc",
       "claim": "The Eiffel Tower is in Berlin.",
       "language": "en",
       "visibility": "private",
       "depth": "standard",
       "domain": "",
       "entities": [],
       "verdict": "False",
       "confidence": "high",
       "lenz_score": 2,
       "key_finding": "Finding for The Eiffel Tower is in Berlin.",
       "executive_summary": "Summary for The Eiffel Tower is in Berlin.",
       "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
       "warnings": [
        "w1"
       ],
       "created_at": "2026-09-01T10:00:00.000000+00:00",
       "completed_at": "2026-09-01T10:00:00.000000+00:00",
       "verification_url": "https://lenz.io/api/v1/verifications/0f67b4fc",
       "url": "https://lenz.io/c/the-earth-is-round-0f67b4fc",
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": {
       "status": "completed",
       "edits": [
        {
         "position": 0,
         "start": 23,
         "end": 29,
         "text": "Berlin",
         "replacement": "Paris"
        }
       ]
      }
     },
     {
      "index": 1,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": [
       {
        "start": 45,
        "end": 85,
        "text": "The EU AI Act took effect in March 2024."
       }
      ],
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "assessment",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "processing",
       "content_status": "available",
       "verification_id": null,
       "task_id": null,
       "claim": null,
       "language": null,
       "visibility": null,
       "depth": null,
       "domain": null,
       "entities": [],
       "verdict": null,
       "confidence": null,
       "lenz_score": null,
       "key_finding": null,
       "executive_summary": null,
       "suggested_rewrite": null,
       "warnings": [],
       "created_at": null,
       "completed_at": null,
       "verification_url": null,
       "url": null,
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": {
       "status": "pending",
       "edits": null
      }
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_suggested_edits_issues_view": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "issues",
    "status": "verifying",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "suggest_edits": true,
     "max_citations": 0
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 2,
      "completed": 1,
      "failed": 0
     },
     "issues": 2,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 12
    },
    "poll_after_seconds": 15,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The Eiffel Tower is in Berlin.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "verification",
      "verification_id": "0f67b4fc",
      "verification_status": "completed",
      "verification_url": "https://lenz.io/api/v1/verifications/0f67b4fc",
      "url": "https://lenz.io/c/the-earth-is-round-0f67b4fc",
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": "Finding for The Eiffel Tower is in Berlin.",
      "rationale": null,
      "suggested_rewrite": "Fixed: The Eiffel Tower is in Berlin.",
      "failure": null,
      "suggested_edits": {
       "status": "completed",
       "edits": [
        {
         "position": 0,
         "start": 23,
         "end": 29,
         "text": "Berlin",
         "replacement": "Paris"
        }
       ]
      }
     },
     {
      "claim_index": 1,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": "processing",
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": null,
      "suggested_edits": {
       "status": "pending",
       "edits": null
      }
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_url_review": {
  "ok": [
   {
    "passed": true,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "completed",
    "outcome": "clean",
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": "2026-09-01T10:00:00.000000Z",
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 1,
     "claims_selected": 1,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 1,
      "failed": 0
     },
     "verifications": {
      "planned": 0,
      "completed": 0,
      "failed": 0
     },
     "issues": 0,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 1
    },
    "poll_after_seconds": null,
    "issues": [],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": [
       {
        "start": null,
        "end": null,
        "text": "The EU AI Act took effect in March 2024."
       }
      ],
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__get_verifying": {
  "ok": [
   {
    "passed": null,
    "review_id": "ee80cff5",
    "view": "full",
    "status": "verifying",
    "outcome": null,
    "created_at": "2026-09-01T10:00:00.000000Z",
    "completed_at": null,
    "language": "en",
    "policy": {
     "verdicts": [
      "False",
      "Mostly False",
      "Mixed"
     ],
     "confidence": [
      "low"
     ],
     "max_assessments": 20,
     "max_verifications": 5,
     "depth": "standard",
     "max_citations": 0,
     "suggest_edits": false
    },
    "summary": {
     "claims_found": 2,
     "claims_selected": 2,
     "claim_limit": 20,
     "claim_limit_exceeded": false,
     "input_truncated": false,
     "assessments": {
      "completed": 2,
      "failed": 0
     },
     "verifications": {
      "planned": 1,
      "completed": 0,
      "failed": 0
     },
     "issues": 1,
     "citations_found": null,
     "citations_selected": null,
     "citation_limit": null,
     "citation_limit_exceeded": null,
     "citation_checks": null,
     "citation_issues": 0,
     "citations_skipped": null,
     "claim_limit_reached": false,
     "citation_limit_reached": null
    },
    "credits": {
     "charged": 2
    },
    "poll_after_seconds": 15,
    "issues": [
     {
      "claim_index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "verified_claim": null,
      "verdict": "False",
      "confidence": "high",
      "source": "assessment",
      "verification_id": null,
      "verification_status": "processing",
      "verification_url": null,
      "url": null,
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "key_finding": null,
      "rationale": null,
      "suggested_rewrite": null,
      "failure": null,
      "suggested_edits": null
     }
    ],
    "failures": [],
    "citation_issues": [],
    "citation_failures": [],
    "claims": [
     {
      "index": 0,
      "claim": "The EU AI Act took effect in March 2024.",
      "positions": null,
      "result": {
       "verdict": "False",
       "confidence": "high",
       "source": "assessment",
       "is_issue": true
      },
      "assessment": {
       "status": "completed",
       "verdict": "False",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [
        "verdict"
       ],
       "disposition": "planned"
      },
      "verification": {
       "status": "processing",
       "content_status": "available",
       "verification_id": null,
       "task_id": null,
       "claim": null,
       "language": null,
       "visibility": null,
       "depth": null,
       "domain": null,
       "entities": [],
       "verdict": null,
       "confidence": null,
       "lenz_score": null,
       "key_finding": null,
       "executive_summary": null,
       "suggested_rewrite": null,
       "warnings": [],
       "created_at": null,
       "completed_at": null,
       "verification_url": null,
       "url": null,
       "failure": null,
       "modified_at": null
      },
      "suggested_edits": null
     },
     {
      "index": 1,
      "claim": "Water boils at 100 C at sea level.",
      "positions": null,
      "result": {
       "verdict": "True",
       "confidence": "high",
       "source": "assessment",
       "is_issue": false
      },
      "assessment": {
       "status": "completed",
       "verdict": "True",
       "confidence": "high",
       "verification_url": null,
       "rationale": null,
       "dissent": null,
       "suggested_rewrite": null,
       "more_claims": [],
       "failure": null,
       "error_code": null,
       "hint": null,
       "identified_claims": []
      },
      "escalation": {
       "matched_rules": [],
       "disposition": "not_selected"
      },
      "verification": null,
      "suggested_edits": null
     }
    ],
    "citations": [],
    "failure": null,
    "more_claims": [],
    "more_claim_locations": [],
    "more_citations": []
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__idempotency_body_mismatch_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "idempotency_body_mismatch"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Idempotency-Key reused with a different request body.",
   "httpCode": "422"
  }
 },
 "review__idempotency_conflict_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "idempotency_conflict",
    "error_message": "Lenz: this request is still being processed from an earlier attempt.",
    "error_description": "HTTP 409 (idempotency_conflict). Nothing new was charged. An earlier attempt of this exact request is still holding it, for up to 15 minutes; it may still be running, or it may have failed. The node already retried for ~30 seconds, and automatic retries are spaced too closely to outlast the hold. Check your Lenz account for the job before sending this input again: a new or re-run execution counts as a new request and would be charged again if the first went through."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: this request is still being processed from an earlier attempt.",
   "description": "HTTP 409 (idempotency_conflict). Nothing new was charged. An earlier attempt of this exact request is still holding it, for up to 15 minutes; it may still be running, or it may have failed. The node already retried for ~30 seconds, and automatic retries are spaced too closely to outlast the hold. Check your Lenz account for the job before sending this input again: a new or re-run execution counts as a new request and would be charged again if the first went through.",
   "httpCode": "409"
  }
 },
 "review__idempotency_conflict_409_existing_review": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__idempotent_replay_202": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__receipt_202": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__receipt_202_empty_webhook_url": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__receipt_202_webhook_url": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "review__stored_replay_202": {
  "ok": [
   {
    "status": "queued",
    "review_id": "ee80cff5",
    "message": "Submitted. Fetch it with Get Review using this review_id, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__batch_202": {
  "ok": [
   {
    "batch_id": "8a532436abbf0d33",
    "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
    "claim_text": "The Earth is round.",
    "status": "queued",
    "partial": false
   },
   {
    "batch_id": "8a532436abbf0d33",
    "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
    "claim_text": "Water boils at 100C at sea level.",
    "status": "queued",
    "partial": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__batch_capacity_503": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "verify__batch_empty_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "claims is required and must be non-empty.",
   "httpCode": "422"
  }
 },
 "verify__batch_idempotency_conflict_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "A request with this Idempotency-Key is already in progress.",
   "httpCode": "409"
  }
 },
 "verify__batch_item_missing_claim_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "verify__batch_no_credits_402": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 10,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: Insufficient credits for batch.",
    "error_description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Insufficient credits for batch.",
   "description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "verify__batch_partial_202": {
  "ok": [
   {
    "batch_id": "8a532436abbf0d33",
    "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
    "claim_text": "First claim.",
    "status": "queued",
    "partial": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__batch_too_many_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Batch size exceeds maximum of 20.",
   "httpCode": "422"
  }
 },
 "verify__blank_claim_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Text is required.",
   "httpCode": "422"
  }
 },
 "verify__capacity_503": {
  "ok": [
   {
    "error": "Service unavailable - try again later or consider setting this node to retry automatically (in the node settings)",
    "status_code": 503,
    "code": "capacity",
    "error_message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
    "error_description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: Lenz is at capacity right now \u2014 retry in ~90s.",
   "description": "Transient (HTTP 503, code: capacity). Nothing was charged. Wait ~90s before submitting again: send this node's error output into a Wait node set to 90 seconds \u2014 Wait Unit: Seconds, since it defaults to Hours \u2014 and loop it back, or re-run the workflow after the wait. \"Retry On Fail\" is not enough on its own \u2014 its tries are spaced too closely to clear the wait.",
   "httpCode": "503"
  }
 },
 "verify__delete_200": {
  "ok": [
   {
    "ok": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__delete_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "verify__delete_not_yours_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "verify__idempotency_body_mismatch_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Idempotency-Key reused with a different request body.",
   "httpCode": "422"
  }
 },
 "verify__idempotency_conflict_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "A request with this Idempotency-Key is already in progress.",
   "httpCode": "409"
  }
 },
 "verify__idempotency_key_replay": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__implicit_dedup_200": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__implicit_repeat_replay": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__invalid_depth_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Input should be 'standard' or 'low'",
   "httpCode": "422"
  }
 },
 "verify__invalid_language_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Unsupported language 'xx-not-a-language'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
   "httpCode": "422"
  }
 },
 "verify__list_200": {
  "ok": [
   {
    "verification_id": "0cce5f94",
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "language": "en",
    "modified_at": null
   },
   {
    "verification_id": "0f67b4fc",
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "language": "en",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__list_200_modified_at_crosses_midnight_by_minutes": {
  "ok": [
   {
    "verification_id": "0cce5f94",
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "language": "en",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__list_200_modified_at_same_day_hours_apart": {
  "ok": [
   {
    "verification_id": "0cce5f94",
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "language": "en",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__list_clamped_200": {
  "ok": [],
  "threw": null,
  "thrown": null
 },
 "verify__list_empty_200": {
  "ok": [],
  "threw": null,
  "thrown": null
 },
 "verify__list_page2_200": {
  "ok": [
   {
    "verification_id": "0cce5f94",
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "language": "en",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__misnamed_field_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "verify__missing_claim_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Field required",
   "httpCode": "422"
  }
 },
 "verify__no_credits_402": {
  "ok": [
   {
    "error": "Payment required - perhaps check your payment details?",
    "status_code": 402,
    "code": "no_credits",
    "cost": 10,
    "credits_remaining": 0,
    "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
    "error_message": "Lenz: No remaining claim checks.",
    "error_description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00)."
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Lenz: No remaining claim checks.",
   "description": "This call costs 10 credits and you have 0 left. Retrying will not help \u2014 this clears when you top up or your monthly credits reset. See https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b (credits reset 2026-09-01T10:00:00+00:00).",
   "httpCode": "402"
  }
 },
 "verify__select_202": {
  "ok": [
   {
    "batch_id": "8a532436abbf0d33",
    "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
    "claim_text": "The Earth is round.",
    "status": "queued",
    "partial": false
   },
   {
    "batch_id": "8a532436abbf0d33",
    "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
    "claim_text": "Water boils at 100C at sea level.",
    "status": "queued",
    "partial": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__select_empty_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "texts is required and must be non-empty.",
   "httpCode": "422"
  }
 },
 "verify__select_invalid_selection_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "invalid_selection"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "invalid_selection",
   "httpCode": "422"
  }
 },
 "verify__select_no_selection_pending_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "no_selection_pending"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "no_selection_pending",
   "httpCode": "409"
  }
 },
 "verify__select_too_many_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "Cannot select more than 20 claims.",
   "httpCode": "422"
  }
 },
 "verify__select_unknown_task_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Task not found.",
   "httpCode": "404"
  }
 },
 "verify__status_cancelled_durable": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "cancelled",
    "failure_class": "cancelled",
    "retryable": false,
    "message": "Verification failed: The check was cancelled.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed_durable": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed_durable_modified_at_crosses_midnight_by_minutes": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed_durable_modified_at_same_day_hours_apart": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed_live_modified_at_crosses_midnight_by_minutes": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_completed_live_modified_at_same_day_hours_apart": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_failed_durable": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "conclusion_failed",
    "failure_class": "internal",
    "retryable": false,
    "message": "Verification failed: The check stopped while writing the conclusion.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_failed_durable_framing": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "framing_failed",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "message": "Verification failed: The input could not be read as a claim.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_failed_live": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "research_empty",
    "failure_class": "insufficient_evidence",
    "retryable": false,
    "message": "Verification failed: No sources about the claim were found.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_failed_live_retryable": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "adjudication_failed",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "message": "Verification failed: The check stopped while the reviewers scored the evidence.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_needs_input": {
  "ok": [
   {
    "status": "needs_input",
    "passed": null,
    "reason": "multi_claim",
    "task_id": "task_1",
    "claims": [
     {
      "claim": "The Earth is round.",
      "domain": "Science",
      "text": "The Earth is round."
     },
     {
      "claim": "Water boils at 100C at sea level.",
      "domain": "Science",
      "text": "Water boils at 100C at sea level."
     }
    ],
    "candidates": [],
    "similar_claims": [],
    "message": "The text contains several distinct claims. Pick one or more of \"claims\" and run the Select Claims operation with this task ID."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_not_a_claim": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "not_a_claim",
    "failure_class": "invalid_input",
    "retryable": false,
    "message": "Verification failed: No claim in the input could be checked against public evidence.",
    "not_a_claim": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_not_a_claim_durable": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "not_a_claim",
    "failure_class": "invalid_input",
    "retryable": false,
    "message": "Verification failed: No claim in the input could be checked against public evidence.",
    "not_a_claim": true
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_not_yours_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Task not found.",
   "httpCode": "404"
  }
 },
 "verify__status_processing": {
  "ok": [
   {
    "status": "processing",
    "passed": null,
    "task_id": "task_1",
    "progress": {
     "step": "research",
     "index": 2,
     "total": 5,
     "elapsed_seconds": "12",
     "poll_after_seconds": 5
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_processing_durable": {
  "ok": [
   {
    "status": "processing",
    "passed": null,
    "task_id": "task_1",
    "progress": {
     "step": "adjudication",
     "index": 4,
     "total": 5,
     "elapsed_seconds": "12",
     "poll_after_seconds": 5
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_task_stuck": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "task_stuck",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "message": "Verification failed: The check stopped responding before it finished.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__status_unknown_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Task not found.",
   "httpCode": "404"
  }
 },
 "verify__stored_progress_completed": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "ab6b91fe",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__stored_progress_failed_crashed": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "task_error",
    "failure_class": "internal",
    "retryable": false,
    "message": "Verification failed: The check stopped on an error on our side.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__stored_progress_failed_insufficient_evidence": {
  "ok": [
   {
    "status": "failed",
    "passed": null,
    "task_id": "task_1",
    "failure_reason": "research_empty",
    "failure_class": "insufficient_evidence",
    "retryable": false,
    "message": "Verification failed: No sources about the claim were found.",
    "not_a_claim": false
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__stored_progress_in_progress": {
  "ok": [
   {
    "status": "processing",
    "passed": null,
    "task_id": "task_1",
    "progress": {
     "step": "research",
     "index": 2,
     "total": 5,
     "elapsed_seconds": "12",
     "poll_after_seconds": 5
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__submit_202": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__submit_202_options": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__submit_202_text_alias": {
  "ok": [
   {
    "status": "queued",
    "task_id": "87b803ba1e33748ece71d934b011522a",
    "chain_id": null,
    "message": "Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook."
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__unauthenticated_401": {
  "ok": [
   {
    "error": "Authorization failed - please check your credentials",
    "status_code": 401
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Authorization failed - please check your credentials",
   "description": "Unauthorized",
   "httpCode": "401"
  }
 },
 "verify__verification_200": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_covered": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_covered__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_crosses_midnight_by_minutes": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_crosses_midnight_by_minutes__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_null": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_null__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_same_day_hours_apart": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_same_day_hours_apart__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_set": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_modified_at_set__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_conclusion_only": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_conclusion_only__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "",
     "assessments": [],
     "debate_pro": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "debate_con": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "panel_agreement": "split"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_empty": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_empty__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "",
     "assessments": [],
     "debate_pro": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "debate_con": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "panel_agreement": "split"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_old_shape_strings": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [
     {
      "title": "",
      "url": "https://old.example/a",
      "source_name": "",
      "snippet": "Old row.",
      "date": ""
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_200_result_json_old_shape_strings__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [],
    "presumed_intent": "",
    "citations": [
     {
      "title": "",
      "url": "https://old.example/a",
      "source_name": "",
      "snippet": "Old row.",
      "date": ""
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "",
       "score": null,
       "reasoning": "",
       "warnings": []
      }
     ],
     "debate_pro": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "debate_con": {
      "role": "",
      "argument": "",
      "rebuttal": ""
     },
     "panel_agreement": "split"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "verify__verification_by_task_id_200": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_by_task_id_200__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_failed_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "verification_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "This check failed and has no result.",
   "httpCode": "409"
  }
 },
 "verify__verification_failed_409_not_a_claim_durable": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "verification_failed"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "This check failed and has no result.",
   "httpCode": "409"
  }
 },
 "verify__verification_not_ready_409": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 409,
    "code": "verification_not_ready"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "This check is still running.",
   "httpCode": "409"
  }
 },
 "verify__verification_not_yours_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "verify__verification_public_anonymous": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "public",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_public_anonymous__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "public",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_public_of_another_user": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "public",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_public_of_another_user__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "public",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_unknown_task_404": {
  "ok": [
   {
    "error": "The resource you are requesting could not be found",
    "status_code": 404
   }
  ],
  "threw": null,
  "thrown": {
   "message": "The resource you are requesting could not be found",
   "description": "Not found.",
   "httpCode": "404"
  }
 },
 "verify__verification_zero_retention_expired_410": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 410,
    "code": "purged"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "This verification is no longer available: its account removes verifications after a set period.",
   "httpCode": "410"
  }
 },
 "verify__verification_zero_retention_served": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical.",
    "executive_summary": "The claim is well supported by evidence.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__verification_zero_retention_served__audit": {
  "ok": [
   {
    "status": "completed",
    "passed": true,
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical.",
    "executive_summary": "The claim is well supported by evidence.",
    "suggested_rewrite": "",
    "warnings": [
     "Relies on limited sources"
    ],
    "claim": "The Earth is round.",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "citations": [
     {
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "source_name": "NASA",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "source_name": "ESA",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "verification_id": "0cce5f94",
    "visibility": "private",
    "depth": "standard",
    "language": "en",
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "modified_at": null,
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9,
       "reasoning": "Source audit reasoning.",
       "warnings": [
        "weak source A"
       ]
      }
     ],
     "debate_pro": {
      "role": "Advocate",
      "argument": "Satellite imagery and geodesy agree.",
      "rebuttal": "Flat-Earth objections do not hold."
     },
     "debate_con": {
      "role": "Skeptic",
      "argument": "The Earth is not a perfect sphere.",
      "rebuttal": "Oblate, but round for the claim."
     },
     "panel_agreement": "unanimous"
    }
   }
  ],
  "threw": null,
  "thrown": null
 },
 "verify__webhook_secret_missing_422": {
  "ok": [
   {
    "error": "Your request is invalid or could not be processed by the service",
    "status_code": 422,
    "code": "webhook_secret_missing"
   }
  ],
  "threw": null,
  "thrown": {
   "message": "Your request is invalid or could not be processed by the service",
   "description": "webhook_url was supplied but this API key has no HMAC secret. Generate one at https://lenz.io/api-credentials (Webhooks panel) before submitting webhook-delivered calls.",
   "httpCode": "422"
  }
 }
};
