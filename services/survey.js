/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  i18n = require("../i18n.config");

module.exports = class Survey {
  static genAgentRating(agent) {
    let response = Response.genQuickReply(
      i18n.__("survey.prompt", {
        agentFirstName: agent
      }),
      [
        {
          title: "\uD83D\uDE00",
          payload: "CSAT_GOOD"
        },
        {
          title: "\uD83D\uDE42",
          payload: "CSAT_AVERAGE"
        },
        {
          title: "\uD83D\uDE41",
          payload: "CSAT_BAD"
        }
      ]
    );

    // This is only triggered 1 min after talking with an agent
    response.delay = "60000";

    return response;
  }

  static handlePayload(payload) {
    let response;

    switch (payload) {
      case "CSAT_GOOD":
        response = Response.genText(i18n.__("survey.positive"));
        break;

      case "CSAT_AVERAGE":
        response = Response.genText(i18n.__("survey.neutral"));
        break;

      case "CSAT_BAD":
        response = Response.genQuickReply(i18n.__("survey.negative"), [
          {
            title: i18n.__("menu.help"),
            payload: "CARE_HELP"
          }
        ]);
        break;

      case "CSAT_SUGGESTION":
        response = Response.genText(i18n.__("survey.suggestion"));
        break;
    }

    return response;
  }
};