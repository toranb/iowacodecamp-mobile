import Ember from 'ember';
import route from 'ember-redux/route';

var model = (dispatch, params) => {
    dispatch({type: 'SELECT_SPEAKER', speaker: params.speaker_id});
};

var SpeakerRoute = Ember.Route.extend();

export default route({model})(SpeakerRoute);
