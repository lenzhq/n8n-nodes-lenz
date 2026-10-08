// Response bodies of the Lenz API in both of its shapes, one pair per case:
// `legacy` is the shape every request carrying the pinned API version gets
// today, `canonical` is the newer shape. The node must read either and hand
// workflows the same output. Copied from recorded responses, with the
// run-specific values replaced by realistic ones.
/* eslint-disable */
export const shapes: Record<string, { legacy: any; canonical: any }> = {
 "statusFailedLive": {
  "legacy": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "error": "Pipeline stopped at: research_empty",
   "failure_reason": "research_empty",
   "failure_class": "insufficient_evidence",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#insufficient-evidence"
  },
  "canonical": {
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
 "statusFailedDurable": {
  "legacy": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "error": "Pipeline stopped: conclusion_failed.",
   "failure_reason": "conclusion_failed",
   "failure_class": "internal",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#internal"
  },
  "canonical": {
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
 "statusNotAClaim": {
  "legacy": {
   "status": "failed",
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "error": "Not a verifiable claim.",
   "failure_reason": "not_a_claim",
   "failure_class": "invalid_input",
   "retryable": false,
   "docs_url": "https://lenz.io/docs/errors#invalid-input",
   "hint": "The input is a greeting, not a statement that can be checked. Send one factual claim, or run the text through /extract to enumerate its claims."
  },
  "canonical": {
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
 "statusNeedsInput": {
  "legacy": {
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
  },
  "canonical": {
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
 "statusCompletedSameDay": {
  "legacy": {
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
  },
  "canonical": {
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
    "completed_at": "2026-09-01T16:00:00.000000+00:00",
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
 "statusCompletedCrossesMidnight": {
  "legacy": {
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
    "created_at": "2026-09-01T23:58:00.000000+00:00",
    "modified_at": "2026-09-02T00:03:00.000000+00:00",
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
  "canonical": {
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
    "created_at": "2026-09-01T23:58:00.000000+00:00",
    "completed_at": "2026-09-02T00:03:00.000000+00:00",
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
 "submitReceipt": {
  "legacy": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued",
   "chain_id": "26c077de422857b6"
  },
  "canonical": {
   "task_id": "87b803ba1e33748ece71d934b011522a",
   "status": "queued"
  }
 },
 "batchReceipt": {
  "legacy": {
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
  },
  "canonical": {
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
 "selectReceipt": {
  "legacy": {
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
  },
  "canonical": {
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
 "assessNoClaim": {
  "legacy": {
   "claims": [],
   "error": "No verifiable claim detected",
   "error_code": "no_claim",
   "candidate_claims": [],
   "more_claims": []
  },
  "canonical": {
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
 "assessAllErrorRows": {
  "legacy": {
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
  },
  "canonical": {
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
 "assessMixedRows": {
  "legacy": {
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
  },
  "canonical": {
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
 "assessOneClaim": {
  "legacy": {
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
  },
  "canonical": {
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
 "extractRateLimited": {
  "legacy": {
   "detail": "Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "reset_in_seconds": 900,
   "doc_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  },
  "canonical": {
   "detail": "Daily /extract limit of 1000 reached for this account. The allowance is shared by every key on the account and by extractions run from the Lenz website.",
   "code": "extract_daily_limit",
   "limit": 1000,
   "retry_after": 900,
   "docs_url": "https://lenz.io/docs/errors#rate-limits",
   "upgrade_url": "https://lenz.io/plans"
  }
 },
 "capacity503": {
  "legacy": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 60,
   "doc_url": "https://lenz.io/docs/errors#unavailable"
  },
  "canonical": {
   "detail": "Lenz is at capacity right now \u2014 please resubmit after the stated wait. Nothing was charged.",
   "code": "capacity",
   "retry_after": 60,
   "docs_url": "https://lenz.io/docs/errors#unavailable"
  }
 },
 "reviewInFlight429": {
  "legacy": {
   "detail": "This account already has 3 reviews running. Retry when one completes.",
   "code": "review_in_flight",
   "retry_after_seconds": 60
  },
  "canonical": {
   "detail": "This account already has 3 reviews running. Retry when one completes.",
   "code": "review_in_flight",
   "retry_after": 60
  }
 },
 "noCredits402": {
  "legacy": {
   "detail": "No remaining claim checks.",
   "code": "no_credits",
   "doc_url": "https://lenz.io/docs/errors#quota",
   "upgrade_url": "https://lenz.io/plans?wall=3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "wall_id": "3f2b8c1e-5a4d-4e6f-9a7b-1c2d3e4f5a6b",
   "remaining": 0,
   "resets_at": "2026-09-01T10:00:00+00:00",
   "credits_remaining": 0,
   "cost": 10
  },
  "canonical": {
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
 "reviewCompletedClean": {
  "legacy": {
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
  },
  "canonical": {
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
 "storedVerification": {
  "legacy": {
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
  },
  "canonical": {
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
 }
};
