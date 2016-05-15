import { test } from 'qunit';
import moduleForAcceptance from 'iowacodecamp/tests/helpers/module-for-acceptance';

var first = {session: "foo", level: 100, desc: "first one", time: "9:00 AM - 10:15 AM", room: "Room A", speaker: {name: "toran", bio: "javascript ninja", location: "Burlington, IA"}};
var last = {session: "bar", level: 300, desc: "last one", time: "10:30 AM - 11:45 AM", room: "Room B", speaker: {name: "nick", bio: "rockstar hacker", location: "Des Moines, IA"}};
var data = {"d":{"success":true,"message":null,"data":[first, last]}};

moduleForAcceptance('Acceptance | sessions', {
    beforeEach() {
        ajax('http://iowacodecamp.com/data/json', 'GET', 200, data);
    }
});

test('sessions route will show the list of available sessions', function(assert) {
    assert.expect(5);
    visit('/');
    andThen(function() {
        var rows = find('.session-row').length;
        assert.equal(rows, 2, rows);
        var first_name = find('.session-name:eq(0)').text();
        assert.equal(first_name, 'foo');
        var last_name = find('.session-name:eq(1)').text();
        assert.equal(last_name, 'bar');
        var first_link = find('.session-link:eq(0) a').attr('href');
        assert.equal(first_link, '#');
        var last_link = find('.session-link:eq(1) a').attr('href');
        assert.equal(last_link, '#');
    });
});

test('session details route will show the session details', function(assert) {
    assert.expect(5); //should be 8
    visit('/');
    click('.session-link:eq(0) a');
    andThen(function() {
        // var session_name = find('.session-name');
        // assert.equal(session_name.text(), 'foo');
        var session_desc = find('.session-desc');
        assert.equal(session_desc.text(), 'first one');
        var session_time = find('.session-time');
        assert.equal(session_time.text(), '9:00 AM - 10:15 AM');
        var session_room = find('.session-room');
        assert.equal(session_room.text(), 'Room A');
        var session_level = find('.session-level');
        assert.equal(session_level.text(), '100');
        // var speakers = find('.session-speaker-row').length;
        // assert.equal(speakers, 1);
        var first_speaker_name = find('.session-speaker-name:eq(0)');
        assert.equal(first_speaker_name.text(), 'toran');
        // var first_speaker_link = find('.session-speaker-link:eq(0) a').attr('href');
        // assert.equal(first_speaker_link, '#');
    });
});

test('sessions will be sorted and grouped by listing time', function(assert) {
    assert.expect(3);
    visit('/');
    andThen(function() {
        var rows = find('.group-time').length;
        assert.equal(rows, 2, rows);
        var first_time = find('.group-time:eq(0)').text();
        assert.equal(first_time, '9:00 AM - 10:15 AM');
        var last_time = find('.group-time:eq(1)').text();
        assert.equal(last_time, '10:30 AM - 11:45 AM');
    });
});
