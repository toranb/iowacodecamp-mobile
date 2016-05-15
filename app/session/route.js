import Ember from 'ember';
import route from 'ember-redux/route';

var model = (dispatch, params) => {
    dispatch({type: 'SELECT_SESSION', session: params.session_id});
};

var SessionRoute = Ember.Route.extend();

export default route({model})(SessionRoute);
