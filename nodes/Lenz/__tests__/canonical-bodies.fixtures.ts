// The same cases as ./legacy-bodies.fixtures.ts, recorded in the newer shape
// the Lenz API can answer in. Run-specific values are replaced by realistic ones.
/* eslint-disable */
import type { LegacyCase } from './legacy-bodies.fixtures';
export const canonicalCases: Record<string, LegacyCase> = {
 "account__me_usage_extra_credits": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 350,
    "used": 0,
    "remaining": 350,
    "extra": 250,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_extra_only": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 137,
    "used": 100,
    "remaining": 37,
    "extra": 37,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_extract_calls": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 100,
    "used": 0,
    "remaining": 100,
    "extra": 0,
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
   "extract": {
    "calls_today": 7,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_free": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 100,
    "used": 0,
    "remaining": 100,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_free_partly_spent": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 100,
    "used": 17,
    "remaining": 83,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_oauth": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 100,
    "used": 0,
    "remaining": 100,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_plus": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "plus",
   "plan_label": "Plus",
   "credits": {
    "total": 500,
    "used": 0,
    "remaining": 500,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_pro": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "pro",
   "plan_label": "Pro",
   "credits": {
    "total": 5000,
    "used": 0,
    "remaining": 5000,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_pro_extra": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "pro",
   "plan_label": "Pro",
   "credits": {
    "total": 6000,
    "used": 0,
    "remaining": 6000,
    "extra": 1000,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__me_usage_stale_quota_row": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
   "plan": "free",
   "plan_label": "Free",
   "credits": {
    "total": 100,
    "used": 0,
    "remaining": 100,
    "extra": 0,
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
   "extract": {
    "calls_today": 0,
    "daily_limit": 1000,
    "unlimited": false
   },
   "has_webhook_secret": false
  }
 },
 "account__webhook_secret_oauth": {
  "operation": "webhookSecret",
  "params": {},
  "status": 200,
  "body": {
   "webhook_secret": "315ac3434d186fa9a2fb48d92381f06e"
  }
 },
 "assess__401_no_key": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 401,
  "body": {
   "detail": "Unauthorized",
   "code": "not_authenticated"
  }
 },
 "assess__402_no_credits": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 402,
  "body": {
   "detail": "No remaining /assess units.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 1
  }
 },
 "assess__422_blank_item": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claims[1] is blank.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "claims",
      1
     ],
     "msg": "claims[1] is blank.",
     "type": "blank_input"
    }
   ]
  }
 },
 "assess__422_blank_text": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claim is required.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "claim"
     ],
     "msg": "claim is required.",
     "type": "blank_input"
    }
   ]
  }
 },
 "assess__422_input_conflict": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Send either `claim` (one text) or `claims` (a list of claims), not both.",
   "code": "input_conflict",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "Send either `claim` (one text) or `claims` (a list of claims), not both.",
     "type": "input_conflict"
    }
   ]
  }
 },
 "assess__422_item_too_long": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claims[1] is 2001 characters; each claim may be at most 2000. Send a document to /extract first, then assess its claims.",
   "code": "item_too_long",
   "errors": [
    {
     "loc": [
      "body",
      "claims",
      1
     ],
     "msg": "claims[1] is 2001 characters; each claim may be at most 2000. Send a document to /extract first, then assess its claims.",
     "type": "item_too_long"
    }
   ]
  }
 },
 "assess__422_no_input_field": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claim: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ]
  }
 },
 "assess__422_too_many_items": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "At most 20 claims per call; got 21. Split the list.",
   "code": "too_many_items",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "At most 20 claims per call; got 21. Split the list.",
     "type": "too_many_items"
    }
   ]
  }
 },
 "assess__422_wrong_type_claim": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claim: Input should be a valid string",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "claim"
     ],
     "msg": "Input should be a valid string",
     "type": "string_type"
    }
   ]
  }
 },
 "assess__422_wrong_type_claims": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "claims: Input should be a valid list",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "claims"
     ],
     "msg": "Input should be a valid list",
     "type": "list_type"
    }
   ]
  }
 },
 "assess__502_framing_failed": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 502,
  "body": {
   "detail": "Framing failed",
   "code": "framing_failed"
  }
 },
 "assess__503_capacity": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 100,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "assess__503_list_all_upstream_unavailable": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 503,
  "body": {
   "detail": "Our model providers are temporarily unavailable. Please retry shortly. Nothing was charged.",
   "code": "upstream_unavailable",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "assess__503_upstream_unavailable": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 503,
  "body": {
   "detail": "Our model providers are temporarily unavailable. Please retry shortly.",
   "code": "upstream_unavailable",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "assess__deep_tier_hit": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Water boils at 100C.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": "https://lenz.io/api/v1/verifications/b452a842",
     "rationale": "The claim is verified.",
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__idempotency_body_mismatch": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body.",
   "code": "idempotency_body_mismatch"
  }
 },
 "assess__idempotency_first": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "The Earth orbits the Sun.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__idempotency_replay": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "The Earth orbits the Sun.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__list_all_error_rows": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "no_checkable_claim",
   "claims": [
    {
     "claim": "hi",
     "language": "en",
     "status": "failed",
     "verdict": null,
     "confidence": null,
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": {
      "code": "no_checkable_claim",
      "detail": "No claim in the input could be checked against public evidence.",
      "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims.",
      "failure_class": "invalid_input",
      "retryable": false,
      "docs_url": "https://lenz.io/docs/errors#invalid-input"
     }
    },
    {
     "claim": "hello",
     "language": "en",
     "status": "failed",
     "verdict": null,
     "confidence": null,
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": {
      "code": "no_checkable_claim",
      "detail": "No claim in the input could be checked against public evidence.",
      "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims.",
      "failure_class": "invalid_input",
      "retryable": false,
      "docs_url": "https://lenz.io/docs/errors#invalid-input"
     }
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__list_compound_item": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Primary claim.",
     "language": "en",
     "status": "completed",
     "verdict": "Mostly False",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [
      "Second claim.",
      "Third claim."
     ],
     "failure": null
    },
    {
     "claim": "A plain claim.",
     "language": "en",
     "status": "completed",
     "verdict": "Mostly False",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__list_mixed_rows": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Water boils at 100 C at sea level.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "hello there",
     "language": "en",
     "status": "failed",
     "verdict": null,
     "confidence": null,
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": {
      "code": "no_checkable_claim",
      "detail": "No claim in the input could be checked against public evidence.",
      "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims.",
      "failure_class": "invalid_input",
      "retryable": false,
      "docs_url": "https://lenz.io/docs/errors#invalid-input"
     }
    },
    {
     "claim": "vendor is down",
     "language": "en",
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
     }
    },
    {
     "claim": "cannot frame",
     "language": "en",
     "status": "failed",
     "verdict": null,
     "confidence": null,
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": {
      "code": "framing_failed",
      "detail": "The input could not be read as a claim.",
      "hint": "This item could not be processed; retrying it as-is will not help. Send it rephrased as one factual statement; nothing was charged.",
      "failure_class": "invalid_input",
      "retryable": false,
      "docs_url": "https://lenz.io/docs/errors#invalid-input"
     }
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__memo_hit": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "The Danube flows through Vienna.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "The river runs through the city.",
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__single_no_claim": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "no_checkable_claim",
   "claims": [],
   "failure": {
    "code": "no_checkable_claim",
    "detail": "No claim in the input could be checked against public evidence.",
    "hint": "The input is a greeting, not a statement that can be checked. Send one factual claim, or run the text through /extract to enumerate its claims.",
    "failure_class": "invalid_input",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   },
   "more_claims": []
  }
 },
 "assess__single_one_claim": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "The registry reported 4,200 filings in 2024.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "The registry lists 4,200 filings for 2024 and has not revised the figure.",
     "dissent": "The registry figure is provisional, so the 2024 total cannot yet be confirmed.",
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__single_text_over_wave_more_claims": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Claim number 0 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 1 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 2 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 3 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 4 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 5 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 6 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 7 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 8 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 9 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 10 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 11 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 12 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 13 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 14 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 15 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 16 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 17 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 18 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Claim number 19 is documented.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": [
    "Claim number 20 is documented.",
    "Claim number 21 is documented."
   ]
  }
 },
 "assess__single_text_several_claims": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Water boils at 100 C at sea level.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "The Moon is made of cheese.",
     "language": "en",
     "status": "completed",
     "verdict": "False",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "The Pacific is the deepest ocean.",
     "language": "en",
     "status": "completed",
     "verdict": "Mostly True",
     "confidence": "medium",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "assess__stored_replay_200": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [
    {
     "claim": "The Earth orbits the Sun.",
     "language": "en",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": null,
     "candidate_claims": [],
     "identified_claims": [],
     "hint": null
    }
   ],
   "error": null,
   "more_claims": []
  }
 },
 "assess__suggest_rewrite": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ok",
   "claims": [
    {
     "claim": "Venus is the closest planet to the Sun.",
     "language": "en",
     "status": "completed",
     "verdict": "False",
     "confidence": "high",
     "verification_url": null,
     "rationale": "Mercury, not Venus, is the closest planet to the Sun.",
     "dissent": null,
     "suggested_rewrite": "Mercury is the closest planet to the Sun.",
     "more_claims": [],
     "failure": null
    },
    {
     "claim": "Mercury is the closest planet to the Sun.",
     "language": "en",
     "status": "completed",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "Mercury is the innermost planet.",
     "dissent": null,
     "suggested_rewrite": null,
     "more_claims": [],
     "failure": null
    }
   ],
   "failure": null,
   "more_claims": []
  }
 },
 "citecheck__402_no_credits": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 402,
  "body": {
   "detail": "No remaining credits for citation checks.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 100,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "cost": 1
  }
 },
 "citecheck__429_citecheck_in_flight": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 429,
  "body": {
   "detail": "This account already has 3 citation checks running. Wait for one to finish.",
   "code": "citecheck_in_flight",
   "retry_after": 60
  }
 },
 "citecheck__503_capacity": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "citecheck__503_citations_unavailable": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Citation checking is switched off right now. Retry later; nothing was charged.",
   "code": "citations_unavailable",
   "retry_after": 300,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "citecheck__get_checking": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_completed_clean": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_completed_doi_pair": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_completed_incomplete": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
       "docs_url": "https://lenz.io/docs/errors#internal"
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
      "docs_url": "https://lenz.io/docs/errors#internal"
     }
    }
   ],
   "failure": null,
   "more_citations": []
  }
 },
 "citecheck__get_completed_issues_found": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 1
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
 },
 "citecheck__get_completed_partly_supported": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_completed_unchecked": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_failed_no_citations": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   },
   "more_citations": null
  }
 },
 "citecheck__get_failed_upstream_unavailable": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
     }
    }
   ],
   "failure": {
    "code": "upstream_unavailable",
    "detail": "A service the check depends on was unavailable.",
    "hint": null,
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   },
   "more_citations": []
  }
 },
 "citecheck__get_queued": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_text_limit_exactly_at_limit": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__get_text_limit_reached": {
  "operation": "getCitationCheck",
  "params": {
   "citecheckId": "cc_1"
  },
  "status": 200,
  "body": {
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
    "citation_issues": 0
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
 },
 "citecheck__idempotency_body_mismatch_422": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body.",
   "code": "idempotency_body_mismatch"
  }
 },
 "citecheck__idempotency_conflict_409": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 409,
  "body": {
   "detail": "A check with this Idempotency-Key is still being created. Retry shortly.",
   "code": "idempotency_conflict",
   "citecheck_id": null
  }
 },
 "citecheck__idempotent_replay_202": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "citecheck_id": "5dc3d994",
   "status": "queued"
  }
 },
 "citecheck__receipt_202": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "citecheck_id": "5dc3d994",
   "status": "queued"
  }
 },
 "citecheck__receipt_202_empty_webhook_url": {
  "operation": "checkCitations",
  "params": {
   "citationInput": "text",
   "citationText": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "citecheck_id": "5dc3d994",
   "status": "queued"
  }
 },
 "errors__ask_empty_message": {
  "operation": "ask",
  "params": {
   "verificationId": "ver_1",
   "question": "why?"
  },
  "status": 422,
  "body": {
   "detail": "Message cannot be empty.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "message"
     ],
     "msg": "Message cannot be empty.",
     "type": "blank_input"
    }
   ]
  }
 },
 "errors__ask_failed": {
  "operation": "ask",
  "params": {
   "verificationId": "ver_1",
   "question": "why?"
  },
  "status": 502,
  "body": {
   "detail": "The chat model could not answer this question.",
   "code": "ask_failed"
  }
 },
 "errors__ask_not_completed": {
  "operation": "ask",
  "params": {
   "verificationId": "ver_1",
   "question": "why?"
  },
  "status": 400,
  "body": {
   "detail": "Ask is only available for completed verifications.",
   "code": "verification_not_ready"
  }
 },
 "errors__auth_bad_key": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 401,
  "body": {
   "detail": "Unauthorized",
   "code": "not_authenticated"
  }
 },
 "errors__auth_insufficient_scope": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 403,
  "body": {
   "detail": "The access token does not allow this call.",
   "code": "insufficient_scope",
   "scope": "verify"
  }
 },
 "errors__not_found_verification": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found"
  }
 },
 "errors__not_found_verify_status": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found.",
   "code": "not_found"
  }
 },
 "errors__payment_required_ask": {
  "operation": "ask",
  "params": {
   "verificationId": "ver_1",
   "question": "why?"
  },
  "status": 402,
  "body": {
   "detail": "No remaining ask credits.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 1
  }
 },
 "errors__payment_required_assess": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 402,
  "body": {
   "detail": "No remaining /assess units.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 1
  }
 },
 "errors__payment_required_verify": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 402,
  "body": {
   "detail": "No remaining claim checks.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 10
  }
 },
 "errors__payment_required_verify_batch_short": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 402,
  "body": {
   "detail": "Insufficient credits for batch.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "requested": 5,
   "remaining": 3,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 30,
   "cost": 50
  }
 },
 "errors__rate_limited_extract": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 429,
  "body": {
   "detail": "Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "retry_after": 900,
   "docs_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  }
 },
 "errors__service_unavailable_ask": {
  "operation": "ask",
  "params": {
   "verificationId": "ver_1",
   "question": "why?"
  },
  "status": 503,
  "body": {
   "detail": "The chat model is unavailable right now. Retry shortly.",
   "code": "upstream_unavailable",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "errors__service_unavailable_capacity": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 60,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "errors__validation_missing_field_hint": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "text: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ],
   "hint": "Required field 'text' is missing. Unrecognised fields: content, bogus.",
   "docs_url": "https://lenz.io/docs/errors#validation",
   "unrecognized_fields": [
    "content",
    "bogus"
   ]
  }
 },
 "errors__validation_wrong_type": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "text: Input should be a valid string",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Input should be a valid string",
     "type": "string_type"
    }
   ]
  }
 },
 "errors__web_review_rate_limited": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 429,
  "body": {
   "detail": "This account has used its extractions for today. The daily allowance is shared with the Lenz API. It resets at 00:00 UTC.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "reset_in_seconds": 777,
   "doc_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  }
 },
 "extract__401_no_key": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 401,
  "body": {
   "detail": "Unauthorized",
   "code": "not_authenticated"
  }
 },
 "extract__422_blank_text": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Text is required.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "text"
     ],
     "msg": "Text is required.",
     "type": "blank_input"
    }
   ]
  }
 },
 "extract__422_focus_too_long": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "focus must be at most 300 characters of plain text.",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "focus"
     ],
     "msg": "focus must be at most 300 characters of plain text.",
     "type": "validation_error"
    }
   ]
  }
 },
 "extract__422_missing_text": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "text: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ]
  }
 },
 "extract__429_daily_limit": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 429,
  "body": {
   "detail": "Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "retry_after": 3600,
   "docs_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  }
 },
 "extract__502_extraction_failed": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 502,
  "body": {
   "detail": "Extraction failed",
   "code": "extraction_failed"
  }
 },
 "extract__503_upstream_unavailable": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 503,
  "body": {
   "detail": "Our model providers are temporarily unavailable. Please retry shortly.",
   "code": "upstream_unavailable",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "extract__focus_ready": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__idempotency_body_mismatch_422": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body.",
   "code": "idempotency_body_mismatch"
  }
 },
 "extract__idempotency_replay": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__locate_all_dropped": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "no_checkable_claim",
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__locate_failed": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__locate_leading_whitespace": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__locate_some_dropped": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__locate_true": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__no_match_with_focus": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "no_match",
   "claims": [],
   "domain": "",
   "key_entities": [],
   "presumed_intent": "",
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__not_a_claim": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "no_checkable_claim",
   "claims": [],
   "domain": "",
   "key_entities": [],
   "presumed_intent": "",
   "original_input": "What a lovely day."
  }
 },
 "extract__not_a_claim_beside_claims": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024."
  }
 },
 "extract__ready_one_claim": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024."
  }
 },
 "extract__ready_several_claims": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year."
  }
 },
 "extract__stored_replay_200": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ready",
   "claim": "Alpha rose 5% in 2024.",
   "identified_claims": [
    "Alpha rose 5% in 2024.",
    "Beta fell 3% last year."
   ],
   "candidate_claims": [],
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
   "locations": null
  }
 },
 "extract__url_fetch_502_unreadable": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 502,
  "body": {
   "detail": "Extraction failed",
   "code": "extraction_failed"
  }
 },
 "extract__url_fetch_503_upstream": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 503,
  "body": {
   "detail": "The page could not be read right now. Please retry shortly.",
   "code": "upstream_unavailable",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "extract__url_input_located": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
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
   "original_input": "https://example.com/an-article"
  }
 },
 "review__401_no_credentials": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 401,
  "body": {
   "detail": "Unauthorized",
   "code": "not_authenticated"
  }
 },
 "review__402_no_credits": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 402,
  "body": {
   "detail": "No remaining credits to assess the draft.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 100,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 100,
   "cost": 1
  }
 },
 "review__402_no_credits_exhausted": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 402,
  "body": {
   "detail": "No remaining credits to assess the draft.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 1
  }
 },
 "review__422_blank_text": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "text: send the draft, or one public http(s) URL.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "text"
     ],
     "msg": "text: send the draft, or one public http(s) URL.",
     "type": "blank_input"
    }
   ]
  }
 },
 "review__422_citations_options_object": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "citations: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "citations"
     ],
     "msg": "Extra inputs are not permitted",
     "type": "extra_forbidden"
    }
   ]
  }
 },
 "review__422_depth_unknown": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.depth: Input should be 'standard' or 'low'",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'",
     "type": "literal_error",
     "ctx": {
      "expected": "'standard' or 'low'"
     }
    }
   ]
  }
 },
 "review__422_invalid_confidence_band": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.confidence: Unknown confidence band 'certain'; use low, medium or high.",
   "code": "invalid_confidence_band",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "confidence"
     ],
     "msg": "Unknown confidence band 'certain'; use low, medium or high.",
     "type": "invalid_confidence_band",
     "ctx": {
      "band": "certain"
     }
    }
   ]
  }
 },
 "review__422_invalid_verdict_label": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.verdicts: Unknown verdict label 'Misleading'; use one of: False, Mostly False, Mixed, Mostly True, True.",
   "code": "invalid_verdict_label",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "verdicts"
     ],
     "msg": "Unknown verdict label 'Misleading'; use one of: False, Mostly False, Mixed, Mostly True, True.",
     "type": "invalid_verdict_label",
     "ctx": {
      "label": "Misleading",
      "labels": "False, Mostly False, Mixed, Mostly True, True"
     }
    }
   ]
  }
 },
 "review__422_max_assessments_negative": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.max_assessments: Input should be greater than or equal to 0",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_assessments"
     ],
     "msg": "Input should be greater than or equal to 0",
     "type": "greater_than_equal",
     "ctx": {
      "ge": 0
     }
    }
   ]
  }
 },
 "review__422_max_citations_negative": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.max_citations: Input should be greater than or equal to 0",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_citations"
     ],
     "msg": "Input should be greater than or equal to 0",
     "type": "greater_than_equal",
     "ctx": {
      "ge": 0
     }
    }
   ]
  }
 },
 "review__422_max_citations_too_big": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.max_citations: Input should be less than or equal to 20",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_citations"
     ],
     "msg": "Input should be less than or equal to 20",
     "type": "less_than_equal",
     "ctx": {
      "le": 20
     }
    }
   ]
  }
 },
 "review__422_max_verifications_too_big": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.max_verifications: Input should be less than or equal to 20",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_verifications"
     ],
     "msg": "Input should be less than or equal to 20",
     "type": "less_than_equal",
     "ctx": {
      "le": 20
     }
    }
   ]
  }
 },
 "review__422_text_missing": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "text: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ]
  }
 },
 "review__422_text_wrong_type": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "text: Input should be a valid string",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Input should be a valid string",
     "type": "string_type"
    }
   ]
  }
 },
 "review__422_unknown_escalate_field": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "escalate.nope: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "nope"
     ],
     "msg": "Extra inputs are not permitted",
     "type": "extra_forbidden"
    }
   ]
  }
 },
 "review__422_unknown_top_level_field": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "max_verifications: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "max_verifications"
     ],
     "msg": "Extra inputs are not permitted",
     "type": "extra_forbidden"
    }
   ]
  }
 },
 "review__422_unsupported_language": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "Unsupported language 'xx'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
   "code": "unsupported_language",
   "errors": [
    {
     "loc": [
      "body",
      "language"
     ],
     "msg": "Unsupported language 'xx'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
     "type": "unsupported_language"
    }
   ]
  }
 },
 "review__422_visibility_public": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "visibility: Input should be 'private' or 'unlisted'",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "visibility"
     ],
     "msg": "Input should be 'private' or 'unlisted'",
     "type": "literal_error",
     "ctx": {
      "expected": "'private' or 'unlisted'"
     }
    }
   ]
  }
 },
 "review__422_webhook_secret_missing": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "webhook_url was supplied but this credential has no webhook signing secret. Create one on the API credentials page (an API key) or read GET /me/webhook-secret (an OAuth connection), then resend.",
   "code": "webhook_secret_missing",
   "errors": [
    {
     "loc": [
      "body",
      "webhook_url"
     ],
     "msg": "webhook_url was supplied but this credential has no webhook signing secret. Create one on the API credentials page (an API key) or read GET /me/webhook-secret (an OAuth connection), then resend.",
     "type": "webhook_secret_missing"
    }
   ]
  }
 },
 "review__429_extract_daily_limit": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 429,
  "body": {
   "detail": "Daily /extract limit of 1000 reached for this account. A review of a URL reads the page like /extract and counts as one /extract call.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "retry_after": 60,
   "docs_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  }
 },
 "review__429_review_in_flight": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 429,
  "body": {
   "detail": "This account already has 3 reviews running. Retry when one completes.",
   "code": "review_in_flight",
   "retry_after": 60
  }
 },
 "review__503_capacity": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "review__503_citations_capacity": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 90,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "review__delete_not_a_route": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 405,
  "body": {
   "detail": "Method not allowed.",
   "code": "method_not_allowed"
  }
 },
 "review__get_403_insufficient_scope": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 403,
  "body": {
   "detail": "The access token does not allow this call.",
   "code": "insufficient_scope",
   "scope": "history:read"
  }
 },
 "review__get_404_not_found": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 404,
  "body": {
   "detail": "Review not found.",
   "code": "not_found"
  }
 },
 "review__get_404_other_account": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 404,
  "body": {
   "detail": "Review not found.",
   "code": "not_found"
  }
 },
 "review__get_410_purged": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 410,
  "body": {
   "detail": "This review is no longer available: its account removes content after a set period.",
   "code": "purged",
   "purged_at": "2026-09-01T10:00:00.000000Z"
  }
 },
 "review__get_422_unknown_view": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 422,
  "body": {
   "detail": "view: use full or issues.",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "query",
      "view"
     ],
     "msg": "view: use full or issues.",
     "type": "validation_error"
    }
   ]
  }
 },
 "review__get_assessing": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_assessment_rows_full_fields": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "docs_url": null
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
      "failure": null
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
       "docs_url": null
      }
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
 },
 "review__get_citations_clean": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_failed_and_unchecked": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "docs_url": "https://lenz.io/docs/errors#internal"
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
      "failure": null
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
       "docs_url": "https://lenz.io/docs/errors#internal"
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
 },
 "review__get_citations_issue_full": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_issue_issues_view": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
 },
 "review__get_citations_limit_exactly_at_limit": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_limit_reached": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_no_claim_but_citations": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
 },
 "review__get_citations_no_claim_no_citation": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   },
   "more_claims": null,
   "more_claim_locations": null,
   "more_citations": null
  }
 },
 "review__get_citations_not_asked": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_only": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
 },
 "review__get_citations_partly_supported": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_running": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_citations_skipped_switched_off": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": "switched_off"
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
      "failure": null
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
 },
 "review__get_citations_skipped_url_input": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": "url_input"
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
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   },
   "more_claims": null,
   "more_claim_locations": null,
   "more_citations": null
  }
 },
 "review__get_claim_limit_not_reached": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_claim_limit_reached_exact": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_completed_assess_only": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_completed_clean": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_completed_issues_all_verified": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_completed_issues_full": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
      "failure": null
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
      "failure": null
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
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
      }
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
      "failure": null
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
       "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
      },
      "status": "failed",
      "content_status": "available"
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
      "failure": null
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
 },
 "review__get_completed_issues_view_issues": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
 },
 "review__get_completed_positions": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_completed_recovered_claim": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_completed_with_untraced_claim": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_during_quick_check": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_failed_every_assessment_failed": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
      }
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
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
      }
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
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   },
   "more_claims": [],
   "more_claim_locations": [],
   "more_citations": []
  }
 },
 "review__get_failed_no_claim": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   },
   "more_claims": null,
   "more_claim_locations": null,
   "more_citations": null
  }
 },
 "review__get_failed_no_claim_untraced": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   },
   "more_claims": null,
   "more_claim_locations": null,
   "more_citations": null
  }
 },
 "review__get_more_claims": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_nested_verification_modified_at_crosses_midnight_by_minutes": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_nested_verification_modified_at_same_day_hours_apart": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_policy_resolved": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_queued": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
 },
 "review__get_suggested_edits": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__get_suggested_edits_issues_view": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
 },
 "review__get_url_review": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
 },
 "review__get_verifying": {
  "operation": "getReview",
  "params": {
   "reviewId": "rev_1"
  },
  "status": 200,
  "body": {
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
    "citations_skipped": null
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
      "failure": null
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
      "failure": null
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
      "failure": null
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
 },
 "review__idempotency_body_mismatch_422": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body.",
   "code": "idempotency_body_mismatch"
  }
 },
 "review__idempotency_conflict_409": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 409,
  "body": {
   "detail": "A review with this Idempotency-Key is still being created. Retry shortly.",
   "code": "idempotency_conflict",
   "review_id": null
  }
 },
 "review__idempotency_conflict_409_existing_review": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 409,
  "body": {
   "detail": "A review with this Idempotency-Key is still being created. Retry shortly.",
   "code": "idempotency_conflict",
   "review_id": "ee80cff5"
  }
 },
 "review__idempotent_replay_202": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "review_id": "ee80cff5",
   "status": "queued"
  }
 },
 "review__receipt_202": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "review_id": "ee80cff5",
   "status": "queued"
  }
 },
 "review__receipt_202_empty_webhook_url": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "review_id": "ee80cff5",
   "status": "queued"
  }
 },
 "review__receipt_202_webhook_url": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "review_id": "ee80cff5",
   "status": "queued"
  }
 },
 "review__stored_replay_202": {
  "operation": "reviewDraft",
  "params": {
   "draft": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "review_id": "ee80cff5",
   "status": "queued"
  }
 },
 "verify__batch_202": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 202,
  "body": {
   "batch_id": "8a532436abbf0d33",
   "items": [
    {
     "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
     "claim": "The Earth is round."
    },
    {
     "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
     "claim": "Water boils at 100C at sea level."
    }
   ]
  }
 },
 "verify__batch_capacity_503": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": "<retry_after>",
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "verify__batch_empty_422": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 422,
  "body": {
   "detail": "claims is required and must be non-empty.",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "claims is required and must be non-empty.",
     "type": "validation_error"
    }
   ]
  }
 },
 "verify__batch_idempotency_conflict_409": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 409,
  "body": {
   "detail": "A request with this Idempotency-Key is already in progress.",
   "code": "idempotency_conflict",
   "task_id": "01334f3b"
  }
 },
 "verify__batch_item_missing_claim_422": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 422,
  "body": {
   "detail": "claims[1].claim: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "claims",
      1,
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ]
  }
 },
 "verify__batch_no_credits_402": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 402,
  "body": {
   "detail": "Insufficient credits for batch.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "requested": 1,
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 10
  }
 },
 "verify__batch_partial_202": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 202,
  "body": {
   "batch_id": "8a532436abbf0d33",
   "items": [
    {
     "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
     "claim": "First claim."
    }
   ],
   "partial": true
  }
 },
 "verify__batch_too_many_422": {
  "operation": "verifyBatch",
  "params": {
   "batchClaims": {
    "claim": [
     {
      "text": "a"
     },
     {
      "text": "b"
     }
    ]
   }
  },
  "status": 422,
  "body": {
   "detail": "Batch size exceeds maximum of 20.",
   "code": "too_many_items",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "Batch size exceeds maximum of 20.",
     "type": "too_many_items"
    }
   ]
  }
 },
 "verify__blank_claim_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "claim is required.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "claim"
     ],
     "msg": "claim is required.",
     "type": "blank_input"
    }
   ]
  }
 },
 "verify__capacity_503": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 503,
  "body": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": "<retry_after>",
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "verify__delete_200": {
  "operation": "deleteVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "ok": true
  }
 },
 "verify__delete_404": {
  "operation": "deleteVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found"
  }
 },
 "verify__delete_not_yours_404": {
  "operation": "deleteVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found"
  }
 },
 "verify__idempotency_body_mismatch_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body.",
   "code": "idempotency_body_mismatch"
  }
 },
 "verify__idempotency_conflict_409": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 409,
  "body": {
   "detail": "A request with this Idempotency-Key is already in progress.",
   "code": "idempotency_conflict",
   "task_id": "87b803ba1e33748ece71d934b011522a"
  }
 },
 "verify__idempotency_key_replay": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__implicit_dedup_200": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__implicit_repeat_replay": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__invalid_depth_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "depth: Input should be 'standard' or 'low'",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'",
     "type": "literal_error",
     "ctx": {
      "expected": "'standard' or 'low'"
     }
    }
   ]
  }
 },
 "verify__invalid_language_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "Unsupported language 'xx-not-a-language'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
   "code": "unsupported_language",
   "errors": [
    {
     "loc": [
      "body",
      "language"
     ],
     "msg": "Unsupported language 'xx-not-a-language'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
     "type": "unsupported_language"
    }
   ]
  }
 },
 "verify__list_200": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [
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
     "language": "en"
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
     "language": "en"
    }
   ],
   "total": 2,
   "page": 1,
   "page_size": 20
  }
 },
 "verify__list_200_modified_at_crosses_midnight_by_minutes": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [
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
     "language": "en"
    }
   ],
   "total": 1,
   "page": 1,
   "page_size": 20
  }
 },
 "verify__list_200_modified_at_same_day_hours_apart": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [
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
     "language": "en"
    }
   ],
   "total": 1,
   "page": 1,
   "page_size": 20
  }
 },
 "verify__list_clamped_200": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [],
   "total": 0,
   "page": 1,
   "page_size": 100
  }
 },
 "verify__list_empty_200": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [],
   "total": 0,
   "page": 1,
   "page_size": 20
  }
 },
 "verify__list_page2_200": {
  "operation": "listVerifications",
  "params": {
   "returnAll": false,
   "limit": 50
  },
  "status": 200,
  "body": {
   "items": [
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
     "language": "en"
    }
   ],
   "total": 3,
   "page": 2,
   "page_size": 2
  }
 },
 "verify__misnamed_field_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "claim: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ],
   "hint": "Required field 'claim' is missing. Unrecognised fields: statement.",
   "docs_url": "https://lenz.io/docs/errors#validation",
   "unrecognized_fields": [
    "statement"
   ]
  }
 },
 "verify__missing_claim_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "claim: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required",
     "type": "missing"
    }
   ]
  }
 },
 "verify__no_credits_402": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 402,
  "body": {
   "detail": "No remaining claim checks.",
   "code": "no_credits",
   "docs_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 10
  }
 },
 "verify__select_202": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 202,
  "body": {
   "batch_id": "8a532436abbf0d33",
   "items": [
    {
     "task_id": "d7a66f720d2a34ebd3b3a82786057bea",
     "claim": "The Earth is round."
    },
    {
     "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
     "claim": "Water boils at 100C at sea level."
    }
   ]
  }
 },
 "verify__select_empty_422": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 422,
  "body": {
   "detail": "claims is required.",
   "code": "blank_input",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "claims is required.",
     "type": "blank_input"
    }
   ]
  }
 },
 "verify__select_invalid_selection_422": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 422,
  "body": {
   "detail": "Selected text was not one of the offered claims: 'The Moon is made of cheese.'",
   "code": "invalid_selection",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "Selected text was not one of the offered claims: 'The Moon is made of cheese.'",
     "type": "invalid_selection"
    }
   ]
  }
 },
 "verify__select_no_selection_pending_409": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 409,
  "body": {
   "detail": "This task has no pending claim selection.",
   "code": "no_selection_pending"
  }
 },
 "verify__select_too_many_422": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 422,
  "body": {
   "detail": "Cannot select more than 20 claims.",
   "code": "too_many_items",
   "errors": [
    {
     "loc": [
      "body",
      "claims"
     ],
     "msg": "Cannot select more than 20 claims.",
     "type": "too_many_items"
    }
   ]
  }
 },
 "verify__select_unknown_task_404": {
  "operation": "select",
  "params": {
   "taskId": "task_1",
   "selectedClaims": [
    "a"
   ]
  },
  "status": 404,
  "body": {
   "detail": "Task not found.",
   "code": "not_found"
  }
 },
 "verify__status_cancelled_durable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "cancelled",
    "detail": "The check was cancelled.",
    "hint": null,
    "failure_class": "cancelled",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#cancelled"
   }
  }
 },
 "verify__status_completed": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_completed_durable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_completed_durable_modified_at_crosses_midnight_by_minutes": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_completed_durable_modified_at_same_day_hours_apart": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_completed_live_modified_at_crosses_midnight_by_minutes": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_completed_live_modified_at_same_day_hours_apart": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__status_failed_durable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "conclusion_failed",
    "detail": "The check stopped while writing the conclusion.",
    "hint": null,
    "failure_class": "internal",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#internal"
   }
  }
 },
 "verify__status_failed_durable_framing": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "framing_failed",
    "detail": "The input could not be read as a claim.",
    "hint": null,
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   }
  }
 },
 "verify__status_failed_live": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "research_empty",
    "detail": "No sources about the claim were found.",
    "hint": null,
    "failure_class": "insufficient_evidence",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
   }
  }
 },
 "verify__status_failed_live_retryable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "adjudication_failed",
    "detail": "The check stopped while the reviewers scored the evidence.",
    "hint": null,
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   }
  }
 },
 "verify__status_needs_input": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "needs_input",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "reason": "multi_claim",
   "claims": [
    {
     "claim": "The Earth is round.",
     "domain": "Science"
    },
    {
     "claim": "Water boils at 100C at sea level.",
     "domain": "Science"
    }
   ],
   "hint": "The text holds several distinct claims. Send the ones to check to POST /verify/{task_id}/select."
  }
 },
 "verify__status_not_a_claim": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "no_checkable_claim",
    "detail": "No claim in the input could be checked against public evidence.",
    "hint": "The input is a greeting, not a statement that can be checked. Send one factual claim, or run the text through /extract to enumerate its claims.",
    "failure_class": "invalid_input",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   }
  }
 },
 "verify__status_not_a_claim_durable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "no_checkable_claim",
    "detail": "No claim in the input could be checked against public evidence.",
    "hint": "No factual statement that can be checked against evidence was found in the input. Send one factual claim, or run the text through /extract to enumerate its claims.",
    "failure_class": "invalid_input",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   }
  }
 },
 "verify__status_not_yours_404": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found.",
   "code": "not_found"
  }
 },
 "verify__status_processing": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "processing",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "progress": {
    "step": "research",
    "index": 2,
    "total": 5,
    "elapsed_seconds": "12",
    "poll_after_seconds": 5
   }
  }
 },
 "verify__status_processing_durable": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "processing",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "progress": {
    "step": "adjudication",
    "index": 4,
    "total": 5,
    "elapsed_seconds": "12",
    "poll_after_seconds": 5
   }
  }
 },
 "verify__status_task_stuck": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "task_stuck",
    "detail": "The check stopped responding before it finished.",
    "hint": null,
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
   }
  }
 },
 "verify__status_unknown_404": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found.",
   "code": "not_found"
  }
 },
 "verify__stored_progress_completed": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "completed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "result": {
    "verification_id": "ab6b91fe",
    "claim": "The Earth is round.",
    "visibility": "private",
    "depth": "standard",
    "domain": "Science",
    "entities": [
     {
      "name": "Earth",
      "qid": null
     }
    ],
    "presumed_intent": "Verify a basic scientific fact",
    "verdict": "True",
    "confidence": "high",
    "lenz_score": 9,
    "key_finding": "The Earth is approximately spherical in shape.",
    "executive_summary": "The claim is verified.",
    "warnings": [
     "Relies on limited sources"
    ],
    "suggested_rewrite": null,
    "created_at": "2026-09-01T10:00:00.000000+00:00",
    "completed_at": "2026-09-01T10:00:00.000000+00:00",
    "sources": [
     {
      "source_name": "NASA",
      "title": "The shape of the Earth",
      "url": "https://nasa.example/shape",
      "snippet": "Satellite imagery shows an oblate spheroid.",
      "date": "2025-01-15"
     },
     {
      "source_name": "ESA",
      "title": "Earth from space",
      "url": "https://esa.example/earth",
      "snippet": "Orbital measurements confirm the curvature.",
      "date": "2025-01-16"
     }
    ],
    "audit": {
     "adjudication_summary": "Both reviewers agreed.",
     "assessments": [
      {
       "panelist_name": "Reviewer A",
       "focus_area": "Claim Precision & Quantitative Accuracy",
       "score": 9.0,
       "reasoning": "Precision analysis reasoning.",
       "warnings": []
      },
      {
       "panelist_name": "Reviewer B",
       "focus_area": "Sources",
       "score": 9.0,
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
    },
    "language": "en",
    "coverage": {
     "status": "uncovered",
     "reasons": [
      "plan"
     ],
     "certificate_id": null,
     "certificate_url": null,
     "as_of": null,
     "currency": "EUR",
     "cap": 10000,
     "aggregate": 500000,
     "terms_version": "v1"
    }
   }
  }
 },
 "verify__stored_progress_failed_crashed": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "task_error",
    "detail": "The check stopped on an error on our side.",
    "hint": null,
    "failure_class": "internal",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#internal"
   }
  }
 },
 "verify__stored_progress_failed_insufficient_evidence": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "failure": {
    "code": "research_empty",
    "detail": "No sources about the claim were found.",
    "hint": null,
    "failure_class": "insufficient_evidence",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
   }
  }
 },
 "verify__stored_progress_in_progress": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 200,
  "body": {
   "status": "processing",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "progress": {
    "step": "research",
    "index": 2,
    "total": 5,
    "elapsed_seconds": "12",
    "poll_after_seconds": 5
   }
  }
 },
 "verify__stored_replay_202": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued",
   "chain_id": "26c077de422857b6"
  }
 },
 "verify__submit_202": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__submit_202_options": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__submit_202_text_alias": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 202,
  "body": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "verify__unauthenticated_401": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 401,
  "body": {
   "detail": "Unauthorized",
   "code": "not_authenticated"
  }
 },
 "verify__verification_200": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_covered": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "covered",
    "reasons": [],
    "certificate_id": "e467bd8abf2913eddccb3d2dc8c86371",
    "certificate_url": "https://lenz.io/certificate/e467bd8abf2913eddccb3d2dc8c86371",
    "as_of": "2026-03-10T12:01:30+00:00",
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_covered__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "covered",
    "reasons": [],
    "certificate_id": "e467bd8abf2913eddccb3d2dc8c86371",
    "certificate_url": "https://lenz.io/certificate/e467bd8abf2913eddccb3d2dc8c86371",
    "as_of": "2026-03-10T12:01:30+00:00",
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_crosses_midnight_by_minutes": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_crosses_midnight_by_minutes__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_null": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_null__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_same_day_hours_apart": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_same_day_hours_apart__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_set": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_modified_at_set__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_conclusion_only": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_conclusion_only__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_empty": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_empty__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_old_shape_strings": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "",
     "title": "",
     "url": "https://old.example/a",
     "snippet": "Old row.",
     "date": ""
    }
   ],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_200_result_json_old_shape_strings__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [],
   "presumed_intent": "",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "",
     "title": "",
     "url": "https://old.example/a",
     "snippet": "Old row.",
     "date": ""
    }
   ],
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_404": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found"
  }
 },
 "verify__verification_by_task_id_200": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_by_task_id_200__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_failed_409": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 409,
  "body": {
   "detail": "This check failed and has no result.",
   "code": "verification_failed",
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "hint": "Resubmit to POST /verify if retryable is true. GET /verify/status/87b803ba1e33748ece71d934b011522a has the full failure.",
   "failure": {
    "code": "research_empty",
    "detail": "No sources about the claim were found.",
    "hint": null,
    "failure_class": "insufficient_evidence",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
   }
  }
 },
 "verify__verification_failed_409_not_a_claim_durable": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 409,
  "body": {
   "detail": "This check failed and has no result.",
   "code": "verification_failed",
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "hint": "No factual statement that can be checked against evidence was found in the input. Send one factual claim, or run the text through /extract to enumerate its claims.",
   "failure": {
    "code": "no_checkable_claim",
    "detail": "No claim in the input could be checked against public evidence.",
    "hint": "No factual statement that can be checked against evidence was found in the input. Send one factual claim, or run the text through /extract to enumerate its claims.",
    "failure_class": "invalid_input",
    "retryable": false,
    "docs_url": "https://lenz.io/docs/errors#invalid-input"
   }
  }
 },
 "verify__verification_not_ready_409": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 409,
  "body": {
   "detail": "This check is still running.",
   "code": "verification_not_ready",
   "status": "processing",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "hint": "Poll GET /verify/status/87b803ba1e33748ece71d934b011522a until it completes, then read its result."
  }
 },
 "verify__verification_not_yours_404": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found"
  }
 },
 "verify__verification_public_anonymous": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "public",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": null
  }
 },
 "verify__verification_public_anonymous__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "public",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": null
  }
 },
 "verify__verification_public_of_another_user": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "public",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_public_of_another_user__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "public",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical in shape.",
   "executive_summary": "The claim is verified.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_unknown_task_404": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found.",
   "code": "not_found",
   "hint": "Unknown id. If this is a task_id, poll GET /verify/status/dddddddddddddddddddddddddddddddd for its status."
  }
 },
 "verify__verification_zero_retention_expired_410": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 410,
  "body": {
   "detail": "This verification is no longer available: its account removes verifications after a set period.",
   "code": "purged",
   "purged_at": "2026-09-01T10:00:00.000000+00:00"
  }
 },
 "verify__verification_zero_retention_served": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical.",
   "executive_summary": "The claim is well supported by evidence.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__verification_zero_retention_served__audit": {
  "operation": "getVerification",
  "params": {
   "verificationId": "ver_1",
   "includeAudit": true
  },
  "status": 200,
  "body": {
   "verification_id": "0cce5f94",
   "claim": "The Earth is round.",
   "visibility": "private",
   "depth": "standard",
   "domain": "Science",
   "entities": [
    {
     "name": "Earth",
     "qid": null
    }
   ],
   "presumed_intent": "Verify a basic scientific fact",
   "verdict": "True",
   "confidence": "high",
   "lenz_score": 9,
   "key_finding": "The Earth is approximately spherical.",
   "executive_summary": "The claim is well supported by evidence.",
   "warnings": [
    "Relies on limited sources"
   ],
   "suggested_rewrite": null,
   "created_at": "2026-09-01T10:00:00.000000+00:00",
   "completed_at": "2026-09-01T10:00:00.000000+00:00",
   "sources": [
    {
     "source_name": "NASA",
     "title": "The shape of the Earth",
     "url": "https://nasa.example/shape",
     "snippet": "Satellite imagery shows an oblate spheroid.",
     "date": "2025-01-15"
    },
    {
     "source_name": "ESA",
     "title": "Earth from space",
     "url": "https://esa.example/earth",
     "snippet": "Orbital measurements confirm the curvature.",
     "date": "2025-01-16"
    }
   ],
   "audit": {
    "adjudication_summary": "Both reviewers agreed.",
    "assessments": [
     {
      "panelist_name": "Reviewer A",
      "focus_area": "Claim Precision & Quantitative Accuracy",
      "score": 9.0,
      "reasoning": "Precision analysis reasoning.",
      "warnings": []
     },
     {
      "panelist_name": "Reviewer B",
      "focus_area": "Sources",
      "score": 9.0,
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
   },
   "language": "en",
   "coverage": {
    "status": "uncovered",
    "reasons": [
     "plan"
    ],
    "certificate_id": null,
    "certificate_url": null,
    "as_of": null,
    "currency": "EUR",
    "cap": 10000,
    "aggregate": 500000,
    "terms_version": "v1"
   }
  }
 },
 "verify__webhook_secret_missing_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": "webhook_url was supplied but this API key has no HMAC secret. Generate one at https://lenz.io/api-credentials (Webhooks panel) before submitting webhook-delivered calls.",
   "code": "webhook_secret_missing",
   "errors": [
    {
     "loc": [
      "body",
      "webhook_url"
     ],
     "msg": "webhook_url was supplied but this API key has no HMAC secret. Generate one at https://lenz.io/api-credentials (Webhooks panel) before submitting webhook-delivered calls.",
     "type": "webhook_secret_missing"
    }
   ]
  }
 }
};
