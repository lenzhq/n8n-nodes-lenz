// Recorded responses of the Lenz API in the shape it answers a request that
// pins API version 2026-05-13 (the version this node still sends), each with
// the operation and parameters that produce it. Run-specific values are
// replaced by realistic ones.
/* eslint-disable */
export interface LegacyCase {
	operation: string;
	params: Record<string, unknown>;
	status: number;
	body: any;
}
export const legacyCases: Record<string, LegacyCase> = {
 "account__me_usage_extra_credits": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_extra_only": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_extract_calls": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_free": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_free_partly_spent": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_oauth": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_plus": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_pro": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_pro_extra": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
 },
 "account__me_usage_stale_quota_row": {
  "operation": "usage",
  "params": {},
  "status": 200,
  "body": {
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
   "detail": "Unauthorized"
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "code": "blank_item"
  }
 },
 "assess__422_blank_text": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Text is required."
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
   "code": "input_conflict"
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
   "code": "item_too_long"
  }
 },
 "assess__422_no_input_field": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
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
   "code": "too_many_items"
  }
 },
 "assess__422_wrong_type_claim": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "claim"
     ],
     "msg": "Input should be a valid string"
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
   "detail": [
    {
     "type": "list_type",
     "loc": [
      "body",
      "payload",
      "claims"
     ],
     "msg": "Input should be a valid list"
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
   "code": "framing_failed",
   "error": "framing_failed"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "assess__deep_tier_hit": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [
    {
     "claim": "Water boils at 100C.",
     "language": "en",
     "verdict": "True",
     "confidence": "high",
     "verification_url": "https://lenz.io/api/v1/verifications/b452a842",
     "rationale": "The claim is verified.",
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
 "assess__idempotency_body_mismatch": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body."
  }
 },
 "assess__idempotency_first": {
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
 "assess__idempotency_replay": {
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
 "assess__list_all_error_rows": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [
    {
     "claim": "hi",
     "language": "en",
     "verdict": "Error",
     "confidence": "low",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": "no_claim",
     "candidate_claims": [],
     "identified_claims": [],
     "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims."
    },
    {
     "claim": "hello",
     "language": "en",
     "verdict": "Error",
     "confidence": "low",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": "no_claim",
     "candidate_claims": [],
     "identified_claims": [],
     "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims."
    }
   ],
   "error": null,
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
   "claims": [
    {
     "claim": "Primary claim.",
     "language": "en",
     "verdict": "Mostly False",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": null,
     "candidate_claims": [],
     "identified_claims": [
      "Second claim.",
      "Third claim."
     ],
     "hint": "Assessed the main claim only. Send identified_claims as their own items to check the rest."
    },
    {
     "claim": "A plain claim.",
     "language": "en",
     "verdict": "Mostly False",
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
 "assess__list_mixed_rows": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [
    {
     "claim": "Water boils at 100 C at sea level.",
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
    },
    {
     "claim": "hello there",
     "language": "en",
     "verdict": "Error",
     "confidence": "low",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": "no_claim",
     "candidate_claims": [],
     "identified_claims": [],
     "hint": "The input is a greeting. Send one factual claim, or run the text through /extract to enumerate its claims."
    },
    {
     "claim": "vendor is down",
     "language": "en",
     "verdict": "Error",
     "confidence": "low",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": "upstream_unavailable",
     "candidate_claims": [],
     "identified_claims": [],
     "hint": "A model provider was unavailable for this item. Retry it; nothing was charged."
    },
    {
     "claim": "cannot frame",
     "language": "en",
     "verdict": "Error",
     "confidence": "low",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": "framing_failed",
     "candidate_claims": [],
     "identified_claims": [],
     "hint": "This item could not be processed; retrying it as-is will not help. Send it rephrased as one factual statement; nothing was charged."
    }
   ],
   "error": null,
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
   "claims": [
    {
     "claim": "The Danube flows through Vienna.",
     "language": "en",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "The river runs through the city.",
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
 "assess__single_no_claim": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [],
   "error": "No verifiable claim detected",
   "error_code": "no_claim",
   "candidate_claims": [],
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
   "claims": [
    {
     "claim": "The registry reported 4,200 filings in 2024.",
     "language": "en",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "The registry lists 4,200 filings for 2024 and has not revised the figure.",
     "dissent": "The registry figure is provisional, so the 2024 total cannot yet be confirmed.",
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
 "assess__single_text_over_wave_more_claims": {
  "operation": "assess",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "claims": [
    {
     "claim": "Claim number 0 is documented.",
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
    },
    {
     "claim": "Claim number 1 is documented.",
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
    },
    {
     "claim": "Claim number 2 is documented.",
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
    },
    {
     "claim": "Claim number 3 is documented.",
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
    },
    {
     "claim": "Claim number 4 is documented.",
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
    },
    {
     "claim": "Claim number 5 is documented.",
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
    },
    {
     "claim": "Claim number 6 is documented.",
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
    },
    {
     "claim": "Claim number 7 is documented.",
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
    },
    {
     "claim": "Claim number 8 is documented.",
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
    },
    {
     "claim": "Claim number 9 is documented.",
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
    },
    {
     "claim": "Claim number 10 is documented.",
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
    },
    {
     "claim": "Claim number 11 is documented.",
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
    },
    {
     "claim": "Claim number 12 is documented.",
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
    },
    {
     "claim": "Claim number 13 is documented.",
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
    },
    {
     "claim": "Claim number 14 is documented.",
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
    },
    {
     "claim": "Claim number 15 is documented.",
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
    },
    {
     "claim": "Claim number 16 is documented.",
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
    },
    {
     "claim": "Claim number 17 is documented.",
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
    },
    {
     "claim": "Claim number 18 is documented.",
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
    },
    {
     "claim": "Claim number 19 is documented.",
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
   "claims": [
    {
     "claim": "Water boils at 100 C at sea level.",
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
    },
    {
     "claim": "The Moon is made of cheese.",
     "language": "en",
     "verdict": "False",
     "confidence": "high",
     "verification_url": null,
     "rationale": null,
     "dissent": null,
     "suggested_rewrite": null,
     "error_code": null,
     "candidate_claims": [],
     "identified_claims": [],
     "hint": null
    },
    {
     "claim": "The Pacific is the deepest ocean.",
     "language": "en",
     "verdict": "Mostly True",
     "confidence": "medium",
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
   "claims": [
    {
     "claim": "Venus is the closest planet to the Sun.",
     "language": "en",
     "verdict": "False",
     "confidence": "high",
     "verification_url": null,
     "rationale": "Mercury, not Venus, is the closest planet to the Sun.",
     "dissent": null,
     "suggested_rewrite": "Mercury is the closest planet to the Sun.",
     "error_code": null,
     "candidate_claims": [],
     "identified_claims": [],
     "hint": null
    },
    {
     "claim": "Mercury is the closest planet to the Sun.",
     "language": "en",
     "verdict": "True",
     "confidence": "high",
     "verification_url": null,
     "rationale": "Mercury is the innermost planet.",
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
   "doc_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 100,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 100,
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
   "retry_after_seconds": 60
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
       "hint": "The check failed on our side. Try again later.",
       "docs_url": "https://lenz.io/docs/errors#internal",
       "retryable": false,
       "failure_class": "internal",
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
      "hint": "The check failed on our side. Try again later.",
      "docs_url": "https://lenz.io/docs/errors#internal",
      "retryable": false,
      "failure_class": "internal",
      "failure_reason": "internal"
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": null,
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
    "failure_reason": "no_citations",
    "failure_class": "invalid_input",
    "retryable": false,
    "hint": "The text has no citation to check: no link, DOI or numbered reference with one.",
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
    "citation_limit_reached": false,
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
       "hint": "Lenz could not reach this source just now. Try again later.",
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "retryable": true,
       "failure_class": "upstream_unavailable",
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
       "hint": "Lenz could not reach this source just now. Try again later.",
       "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
       "retryable": true,
       "failure_class": "upstream_unavailable",
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
      "hint": "Lenz could not reach this source just now. Try again later.",
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
      "retryable": true,
      "failure_class": "upstream_unavailable",
      "failure_reason": "upstream_unavailable"
     }
    },
    {
     "citation_index": 1,
     "reference": "a statement",
     "cited_url": "https://example.org/statement",
     "doi": null,
     "failure": {
      "hint": "Lenz could not reach this source just now. Try again later.",
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable",
      "retryable": true,
      "failure_class": "upstream_unavailable",
      "failure_reason": "upstream_unavailable"
     }
    }
   ],
   "failure": {
    "failure_reason": "upstream_unavailable",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "hint": null,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "citation_limit_reached": true,
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
   "code": "idempotency_body_mismatch",
   "errors": [
    {
     "loc": [
      "header"
     ],
     "msg": "Idempotency-Key reused with a different request body."
    }
   ]
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
   "detail": "Message cannot be empty."
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
   "code": "ask_failed",
   "error": "ask_failed"
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
   "detail": "Ask is only available for completed verifications."
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
   "detail": "Unauthorized"
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
   "detail": "Not found."
  }
 },
 "errors__not_found_verify_status": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found."
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "reset_in_seconds": 900,
   "doc_url": "https://lenz.io/docs/errors#rate-limits",
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
    }
   ],
   "hint": "Required field 'text' is missing. Unrecognised fields: content, bogus.",
   "doc_url": "https://lenz.io/docs/errors#validation",
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
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Input should be a valid string"
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
   "detail": "Unauthorized"
  }
 },
 "extract__422_blank_text": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Text is required."
  }
 },
 "extract__422_focus_too_long": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "focus must be at most 300 characters of plain text."
  }
 },
 "extract__422_missing_text": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
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
   "reset_in_seconds": 3600,
   "doc_url": "https://lenz.io/docs/errors#rate-limits",
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
   "code": "extraction_failed",
   "error": "extraction_failed"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "claim": "Beta fell 3% last year.",
   "identified_claims": [],
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
 "extract__idempotency_body_mismatch_422": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 422,
  "body": {
   "detail": "Idempotency-Key reused with a different request body."
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
 "extract__locate_all_dropped": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "not_a_claim",
   "claim": "",
   "identified_claims": [],
   "candidate_claims": [],
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
   "locations": []
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
 "extract__locate_leading_whitespace": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "ready",
   "claim": "Alpha rose 5% in 2024.",
   "identified_claims": [],
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
   ]
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
   ]
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
   ]
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
   "claim": "",
   "identified_claims": [],
   "candidate_claims": [],
   "domain": "",
   "key_entities": [],
   "presumed_intent": "",
   "original_input": "Alpha rose 5% in 2024. Beta fell 3% last year.",
   "locations": null
  }
 },
 "extract__not_a_claim": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "not_a_claim",
   "claim": "",
   "identified_claims": [],
   "candidate_claims": [],
   "domain": "",
   "key_entities": [],
   "presumed_intent": "",
   "original_input": "What a lovely day.",
   "locations": null
  }
 },
 "extract__not_a_claim_beside_claims": {
  "operation": "extract",
  "params": {
   "text": "x"
  },
  "status": 200,
  "body": {
   "status": "not_a_claim",
   "claim": "Alpha rose 5% in 2024.",
   "identified_claims": [],
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
   "original_input": "Alpha rose 5% in 2024.",
   "locations": null
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
   "claim": "Alpha rose 5% in 2024.",
   "identified_claims": [],
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
   "original_input": "Alpha rose 5% in 2024.",
   "locations": null
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
   "code": "extraction_failed",
   "error": "extraction_failed"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "claim": "Alpha rose 5% in 2024.",
   "identified_claims": [],
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
   "original_input": "https://example.com/an-article",
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
   ]
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
   "detail": "Unauthorized"
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "text"
     ],
     "msg": "text: send the draft, or one public http(s) URL."
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
   "detail": "payload.citations: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "citations"
     ],
     "msg": "Extra inputs are not permitted"
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
   "detail": "payload.escalate.depth: Input should be 'standard' or 'low'",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'"
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
   "detail": "payload.escalate.confidence: Unknown confidence band 'certain'; use low, medium or high.",
   "code": "invalid_confidence_band",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "confidence"
     ],
     "msg": "Unknown confidence band 'certain'; use low, medium or high."
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
   "detail": "payload.escalate.verdicts: Unknown verdict label 'Misleading'; use one of: False, Mostly False, Mixed, Mostly True, True.",
   "code": "invalid_verdict_label",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "verdicts"
     ],
     "msg": "Unknown verdict label 'Misleading'; use one of: False, Mostly False, Mixed, Mostly True, True."
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
   "detail": "payload.escalate.max_assessments: Input should be greater than or equal to 0",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_assessments"
     ],
     "msg": "Input should be greater than or equal to 0"
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
   "detail": "payload.escalate.max_citations: Input should be greater than or equal to 0",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_citations"
     ],
     "msg": "Input should be greater than or equal to 0"
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
   "detail": "payload.escalate.max_citations: Input should be less than or equal to 20",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_citations"
     ],
     "msg": "Input should be less than or equal to 20"
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
   "detail": "payload.escalate.max_verifications: Input should be less than or equal to 20",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "max_verifications"
     ],
     "msg": "Input should be less than or equal to 20"
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
   "detail": "payload.text: Field required",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
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
   "detail": "payload.text: Input should be a valid string",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Input should be a valid string"
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
   "detail": "payload.escalate.nope: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "escalate",
      "nope"
     ],
     "msg": "Extra inputs are not permitted"
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
   "detail": "payload.max_verifications: Extra inputs are not permitted",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "max_verifications"
     ],
     "msg": "Extra inputs are not permitted"
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
   "detail": "language: Unsupported language 'xx'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact.",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "language"
     ],
     "msg": "language: Unsupported language 'xx'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact."
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
   "detail": "payload.visibility: Input should be 'private' or 'unlisted'",
   "code": "validation_error",
   "errors": [
    {
     "loc": [
      "body",
      "payload",
      "visibility"
     ],
     "msg": "Input should be 'private' or 'unlisted'"
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
     "msg": "webhook_url was supplied but this credential has no webhook signing secret. Create one on the API credentials page (an API key) or read GET /me/webhook-secret (an OAuth connection), then resend."
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
   "reset_in_seconds": 60,
   "doc_url": "https://lenz.io/docs/errors#rate-limits",
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
   "retry_after_seconds": 60
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "<non-json>": "Method not allowed"
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
     "msg": "view: use full or issues."
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "failure_reason": "timeout",
      "failure_class": "upstream_unavailable",
      "retryable": true,
      "hint": "The check ran out of time. Retry it; nothing was charged.",
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
      "rationale": "Two reviewers found the date wrong.",
      "dissent": "One reviewer read the claim as about the entry into force.",
      "verification_url": null,
      "error_code": null,
      "identified_claims": [
       "The EU AI Act took effect in 2024.",
       "It took effect in March."
      ],
      "hint": "This text holds more than one claim.",
      "suggested_rewrite": "The EU AI Act entered into force in August 2024.",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": "timeout",
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
      "failure": {
       "failure_reason": "timeout",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "hint": "The check ran out of time. Retry it; nothing was charged.",
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "hint": "The check failed on our side. Try again later.",
      "docs_url": "https://lenz.io/docs/errors#internal",
      "retryable": false,
      "failure_class": "internal",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
       "hint": "The check failed on our side. Try again later.",
       "docs_url": "https://lenz.io/docs/errors#internal",
       "retryable": false,
       "failure_class": "internal",
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": true,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 0,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
    "claims_selected": null,
    "claim_limit": 20,
    "claim_limit_reached": null,
    "input_truncated": false,
    "assessments": null,
    "verifications": null,
    "issues": 0,
    "citations_found": null,
    "citations_selected": null,
    "citation_limit": 20,
    "citation_limit_reached": null,
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
    "failure_reason": "no_claim",
    "failure_class": "invalid_input",
    "retryable": false,
    "hint": "No factual statement that can be checked against evidence was found in the input. Send one factual claim, or run the text through /extract to enumerate its claims.",
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 0,
    "claim_limit": 0,
    "claim_limit_reached": true,
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
    "citation_limit_reached": false,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": false,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": null,
    "claim_limit": 20,
    "claim_limit_reached": null,
    "input_truncated": false,
    "assessments": null,
    "verifications": null,
    "issues": 0,
    "citations_found": null,
    "citations_selected": null,
    "citation_limit": 20,
    "citation_limit_reached": null,
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
    "failure_reason": "upstream_unavailable",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "hint": null,
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
    "claims_selected": 2,
    "claim_limit": 3,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 2,
    "claim_limit_reached": true,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 3,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 4,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "failure_reason": "research_empty",
      "failure_class": "insufficient_evidence",
      "retryable": false,
      "hint": null,
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
      "failure_reason": "upstream_unavailable",
      "failure_class": "upstream_unavailable",
      "retryable": true,
      "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": "upstream_unavailable",
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
      "failure": {
       "failure_reason": "upstream_unavailable",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
      "verification_url": null,
      "url": null,
      "failure": {
       "failure_reason": "research_empty",
       "failure_class": "insufficient_evidence",
       "retryable": false,
       "hint": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 4,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "failure_reason": "research_empty",
      "failure_class": "insufficient_evidence",
      "retryable": false,
      "hint": null,
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
      "failure_reason": "upstream_unavailable",
      "failure_class": "upstream_unavailable",
      "retryable": true,
      "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "failure_reason": "upstream_unavailable",
      "failure_class": "upstream_unavailable",
      "retryable": true,
      "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
      "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
     }
    },
    {
     "claim_index": 1,
     "claim": "Water boils at 100 C at sea level.",
     "stage": "assessment",
     "failure": {
      "failure_reason": "upstream_unavailable",
      "failure_class": "upstream_unavailable",
      "retryable": true,
      "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": "upstream_unavailable",
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
      "failure": {
       "failure_reason": "upstream_unavailable",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": "upstream_unavailable",
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
      "failure": {
       "failure_reason": "upstream_unavailable",
       "failure_class": "upstream_unavailable",
       "retryable": true,
       "hint": "A model provider was unavailable for this item. Retry it; nothing was charged.",
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
    "failure_reason": "assessment_failed",
    "failure_class": "upstream_unavailable",
    "retryable": true,
    "hint": "No claim could be assessed. Retry the review with a new Idempotency-Key; nothing was charged.",
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
    "claims_selected": null,
    "claim_limit": 20,
    "claim_limit_reached": null,
    "input_truncated": false,
    "assessments": null,
    "verifications": null,
    "issues": 0,
    "citations_found": null,
    "citations_selected": null,
    "citation_limit": null,
    "citation_limit_reached": null,
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
    "failure_reason": "no_claim",
    "failure_class": "invalid_input",
    "retryable": false,
    "hint": "The text is a greeting, not a statement about the world. Send one factual claim, or run the text through /extract to enumerate its claims.",
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
    "claims_selected": null,
    "claim_limit": 20,
    "claim_limit_reached": null,
    "input_truncated": false,
    "assessments": null,
    "verifications": null,
    "issues": 0,
    "citations_found": null,
    "citations_selected": null,
    "citation_limit": null,
    "citation_limit_reached": null,
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
    "failure_reason": "no_claim",
    "failure_class": "invalid_input",
    "retryable": false,
    "hint": "None of the claims found in the text could be traced back to it. Send one factual claim, or run the text through /extract to enumerate its claims.",
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
    "claims_selected": 2,
    "claim_limit": 2,
    "claim_limit_reached": true,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": null,
    "claim_limit": 20,
    "claim_limit_reached": null,
    "input_truncated": false,
    "assessments": null,
    "verifications": null,
    "issues": 0,
    "citations_found": null,
    "citations_selected": null,
    "citation_limit": null,
    "citation_limit_reached": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
    "claims_selected": 1,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
    "claims_selected": 2,
    "claim_limit": 20,
    "claim_limit_reached": false,
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
    "citation_limit_reached": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
      "modified_at": null,
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
      "rationale": null,
      "dissent": null,
      "verification_url": null,
      "error_code": null,
      "identified_claims": [],
      "hint": null,
      "suggested_rewrite": null,
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
   "code": "idempotency_body_mismatch",
   "errors": [
    {
     "loc": [
      "header"
     ],
     "msg": "Idempotency-Key reused with a different request body."
    }
   ]
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
     "claim_text": "The Earth is round."
    },
    {
     "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
     "claim_text": "Water boils at 100C at sea level."
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "detail": "claims is required and must be non-empty."
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
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "claims",
      1,
      "text"
     ],
     "msg": "Field required"
    }
   ]
  }
 },
 "verify__batch_item_webhook_url_null_422": {
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
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "claims",
      1,
      "webhook_url"
     ],
     "msg": "Input should be a valid string"
    },
    {
     "type": "literal_error",
     "loc": [
      "body",
      "payload",
      "claims",
      1,
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'",
     "ctx": {
      "expected": "'standard' or 'low'"
     }
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
     "claim_text": "First claim."
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
   "detail": "Batch size exceeds maximum of 20."
  }
 },
 "verify__batch_webhook_url_null_422": {
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
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "webhook_url"
     ],
     "msg": "Input should be a valid string"
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
   "detail": "Text is required."
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
   "doc_url": "https://lenz.io/docs/errors#unavailable"
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
   "detail": "Not found."
  }
 },
 "verify__delete_not_yours_404": {
  "operation": "deleteVerification",
  "params": {
   "verificationId": "ver_1"
  },
  "status": 404,
  "body": {
   "detail": "Not found."
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
   "detail": "Idempotency-Key reused with a different request body."
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
   "status": "queued",
   "chain_id": "26c077de422857b6"
  }
 },
 "verify__implicit_dedup_200": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 200,
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
   "status": "queued",
   "chain_id": "26c077de422857b6"
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
   "detail": [
    {
     "type": "literal_error",
     "loc": [
      "body",
      "payload",
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'",
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
   "detail": "Unsupported language 'xx-not-a-language'. Supported: en, es, de, fr, it, pt, nl, sv, da, no, fi, bg. To ask for another language, contact us at https://lenz.io/contact."
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
     "modified_at": null,
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
     "modified_at": null,
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
     "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
     "modified_at": null,
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
     "modified_at": null,
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
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
    }
   ],
   "hint": "Required field 'claim' is missing. Unrecognised fields: statement.",
   "doc_url": "https://lenz.io/docs/errors#validation",
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
   "detail": [
    {
     "type": "missing",
     "loc": [
      "body",
      "payload",
      "text"
     ],
     "msg": "Field required"
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
   "doc_url": "https://lenz.io/docs/errors#quota",
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
     "claim_text": "The Earth is round."
    },
    {
     "task_id": "344e9ebf6ccfa38c8ad04f5f874b3c17",
     "claim_text": "Water boils at 100C at sea level."
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
   "detail": "texts is required and must be non-empty."
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
   "error": "invalid_selection"
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
   "code": "no_selection_pending",
   "error": "no_selection_pending"
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
   "detail": "Cannot select more than 20 claims."
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
   "detail": "Task not found."
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
   "error": "Cancelled.",
   "failure_reason": "cancelled",
   "failure_class": "cancelled",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#cancelled"
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
    "modified_at": null,
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
    "modified_at": null,
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
    "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
    "modified_at": null,
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
    "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
    "modified_at": null,
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
   "error": "Pipeline stopped: conclusion_failed.",
   "failure_reason": "conclusion_failed",
   "failure_class": "internal",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#internal"
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
   "error": "Pipeline stopped: framing_failed.",
   "failure_reason": "framing_failed",
   "failure_class": "upstream_unavailable",
   "retryable": true,
   "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
   "error": "Pipeline stopped at: research_empty",
   "failure_reason": "research_empty",
   "failure_class": "insufficient_evidence",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
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
   "error": "Pipeline stopped at: adjudication_failed",
   "failure_reason": "adjudication_failed",
   "failure_class": "upstream_unavailable",
   "retryable": true,
   "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
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
     "text": "The Earth is round.",
     "domain": "Science"
    },
    {
     "text": "Water boils at 100C at sea level.",
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
   "error": "Not a verifiable claim.",
   "failure_reason": "not_a_claim",
   "failure_class": "invalid_input",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#invalid-input",
   "hint": "The input is a greeting, not a statement that can be checked. Send one factual claim, or run the text through /extract to enumerate its claims."
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
   "error": "Pipeline stopped: not_a_claim.",
   "failure_reason": "not_a_claim",
   "failure_class": "invalid_input",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#invalid-input"
  }
 },
 "verify__status_not_yours_404": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found."
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
   "error": "The task was never completed and has been marked failed.",
   "failure_reason": "task_stuck",
   "failure_class": "upstream_unavailable",
   "retryable": true,
   "docs_url": "https://lenz.io/docs/errors#upstream-unavailable"
  }
 },
 "verify__status_unknown_404": {
  "operation": "verifyStatus",
  "params": {
   "taskId": "task_1"
  },
  "status": 404,
  "body": {
   "detail": "Task not found."
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
    "modified_at": null,
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
   "error": "Pipeline failed.",
   "failure_reason": "task_error",
   "failure_class": "internal",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#internal"
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
   "error": "Pipeline stopped at: research_empty",
   "failure_reason": "research_empty",
   "failure_class": "insufficient_evidence",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
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
   "status": "queued",
   "chain_id": "26c077de422857b6"
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
   "status": "queued",
   "chain_id": "26c077de422857b6"
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
   "status": "queued",
   "chain_id": "26c077de422857b6"
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
   "detail": "Unauthorized"
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
    "certificate_id": "88e7a7e4d7b9afc0ca9206690884eade",
    "certificate_url": "https://lenz.io/certificate/88e7a7e4d7b9afc0ca9206690884eade",
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
   "modified_at": null,
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
    "certificate_id": "88e7a7e4d7b9afc0ca9206690884eade",
    "certificate_url": "https://lenz.io/certificate/88e7a7e4d7b9afc0ca9206690884eade",
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
   "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
   "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
   "modified_at": "2026-09-01T10:00:00.000000+00:00",
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "detail": "Not found."
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
   "modified_at": null,
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
   "modified_at": null,
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
   "failure_reason": "research_empty",
   "failure_class": "insufficient_evidence",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
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
   "hint": "Resubmit to POST /verify if retryable is true. GET /verify/status/87b803ba1e33748ece71d934b011522a has the full failure.",
   "failure_reason": "not_a_claim",
   "failure_class": "invalid_input",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#invalid-input"
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
   "detail": "Not found."
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "modified_at": null,
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
   "code": "webhook_secret_missing"
  }
 },
 "verify__webhook_url_null_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "webhook_url"
     ],
     "msg": "Input should be a valid string"
    }
   ]
  }
 },
 "verify__webhook_url_null_and_missing_claim_422": {
  "operation": "verify",
  "params": {
   "claim": "x",
   "waitForCompletion": false
  },
  "status": 422,
  "body": {
   "detail": [
    {
     "type": "string_type",
     "loc": [
      "body",
      "payload",
      "webhook_url"
     ],
     "msg": "Input should be a valid string"
    },
    {
     "type": "literal_error",
     "loc": [
      "body",
      "payload",
      "depth"
     ],
     "msg": "Input should be 'standard' or 'low'",
     "ctx": {
      "expected": "'standard' or 'low'"
     }
    }
   ]
  }
 }
};
