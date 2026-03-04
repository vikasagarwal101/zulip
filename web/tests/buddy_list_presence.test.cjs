"use strict";

const assert = require("node:assert/strict");

const {mock_esm, zrequire} = require("./lib/namespace.cjs");
const {run_test} = require("./lib/test.cjs");
const $ = require("./lib/zjquery.cjs");

const buddy_data = mock_esm("../src/buddy_data.ts");
const people = mock_esm("../src/people.ts");

const buddy_list_presence = zrequire("buddy_list_presence");

run_test("update_indicators clears deactivated classes", ({override}) => {
    override(people, "is_active_user_or_system_bot", () => true);
    override(buddy_data, "get_user_circle_class", () => "user-circle-active");

    const $presence = $.create("[data-presence-indicator-user-id='10']");
    $presence.addClass("user-circle-deactivated zulip-icon-user-circle-deactivated");

    buddy_list_presence.update_indicators();

    assert.equal($presence.hasClass("user-circle-deactivated"), false);
    assert.equal($presence.hasClass("zulip-icon-user-circle-deactivated"), false);
    assert.equal($presence.hasClass("user-circle-active"), true);
    assert.equal($presence.hasClass("zulip-icon-user-circle-active"), true);
});
