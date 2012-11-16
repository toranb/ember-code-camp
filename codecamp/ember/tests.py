import json
from django.test import TestCase
from codecamp.ember.models import Session, Speaker, Rating


def add_sessions_ratings_and_speakers():
    first_session = Session(name='first', room='A', desc='javascript')
    last_session = Session(name='last', room='Z', desc='python')
    first_session.save()
    last_session.save()
    first_rating = Rating(score=9, feedback='legit', session=first_session)
    last_rating = Rating(score=2, feedback='broken', session=first_session)
    first_rating.save()
    last_rating.save()
    first_speaker = Speaker(name='foo', session=first_session)
    last_speaker = Speaker(name='bar', session=last_session)
    first_speaker.save()
    last_speaker.save()
    return first_session, last_session, first_rating, last_rating, first_speaker, last_speaker


class SessionTests(TestCase):

    def setUp(self):
        self.first_session, self.last_session, self.first_rating, self.last_rating, self.first_speaker, self.last_speaker = add_sessions_ratings_and_speakers()

    def test_will_return_json_with_list_of_sessions(self):
        response = self.client.get('/codecamp/sessions')
        sessions = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(sessions), 2)

    def test_sessions_json_has_an_attribute_for_each_item(self):
        response = self.client.get('/codecamp/sessions')
        sessions = json.loads(response.content)
        self.assertEqual(sessions[0]['name'], 'first')
        self.assertEqual(sessions[0]['room'], 'A')
        self.assertEqual(sessions[0]['desc'], 'javascript')
        self.assertEqual(sessions[1]['name'], 'last')
        self.assertEqual(sessions[1]['room'], 'Z')
        self.assertEqual(sessions[1]['desc'], 'python')

    def test_sessions_json_has_rating_list_with_ids_of_related_ratings(self):
        response = self.client.get('/codecamp/sessions')
        sessions = json.loads(response.content)
        ratings = [self.first_rating.pk, self.last_rating.pk]
        self.assertEqual(sessions[0]['ratings'], ratings)
        self.assertEqual(sessions[1]['ratings'], [])

    def test_sessions_json_has_speaker_list_with_ids_of_related_speakers(self):
        response = self.client.get('/codecamp/sessions')
        sessions = json.loads(response.content)
        first_speakers = [self.first_speaker.pk]
        last_speakers = [self.last_speaker.pk]
        self.assertEqual(sessions[0]['speakers'], first_speakers)
        self.assertEqual(sessions[1]['speakers'], last_speakers)


class RatingTests(TestCase):

    def setUp(self):
        self.first_session, self.last_session, self.first_rating, self.last_rating, self.first_speaker, self.last_speaker = add_sessions_ratings_and_speakers()

    def test_will_return_json_with_list_of_ratings_for_given_session_id(self):
        response = self.client.get('/codecamp/sessions/{}/ratings/'.format(self.first_session.pk))
        ratings = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(ratings), 2)

    def test_ratings_json_has_an_attribute_for_each_item(self):
        response = self.client.get('/codecamp/sessions/{}/ratings/'.format(self.first_session.pk))
        ratings = json.loads(response.content)
        self.assertEqual(ratings[0]['score'], 9)
        self.assertEqual(ratings[0]['feedback'], 'legit')
        self.assertEqual(ratings[0]['session'], self.first_session.pk)
        self.assertEqual(ratings[1]['score'], 2)
        self.assertEqual(ratings[1]['feedback'], 'broken')
        self.assertEqual(ratings[1]['session'], self.first_session.pk)

    def test_ratings_json_returns_empty_list_given_last_session_id(self):
        response = self.client.get('/codecamp/sessions/{}/ratings/'.format(self.last_session.pk))
        ratings = json.loads(response.content)
        self.assertEqual(len(ratings), 0)
        self.assertEqual(ratings, [])

    def test_detail_ratings_endpoint_returns_attributes_for_given_rating_id(self):
        response = self.client.get('/codecamp/ratings/{}/'.format(self.last_rating.pk))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"id": 2, "score": 2, "feedback": "broken", "session": 1}')


class SpeakerTests(TestCase):

    def setUp(self):
        self.first_session, self.last_session, self.first_rating, self.last_rating, self.first_speaker, self.last_speaker = add_sessions_ratings_and_speakers()

    def test_will_return_json_with_list_of_speakers_for_given_session_id(self):
        response = self.client.get('/codecamp/sessions/{}/speakers/'.format(self.first_session.pk))
        speakers = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(speakers), 1)

    def test_speakers_json_has_an_attribute_for_each_item(self):
        response = self.client.get('/codecamp/sessions/{}/speakers/'.format(self.first_session.pk))
        speakers = json.loads(response.content)
        self.assertEqual(speakers[0]['name'], 'foo')
        self.assertEqual(speakers[0]['session'], self.first_session.pk)

    def test_speakers_json_returns_last_speaker_json_given_last_session_id(self):
        response = self.client.get('/codecamp/sessions/{}/speakers/'.format(self.last_session.pk))
        speakers = json.loads(response.content)
        self.assertEqual(speakers[0]['name'], 'bar')
        self.assertEqual(speakers[0]['session'], self.last_session.pk)

    def test_detail_speakers_endpoint_returns_attributes_for_given_speaker_id(self):
        response = self.client.get('/codecamp/speakers/{}/'.format(self.first_speaker.pk))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, '{"id": 1, "name": "foo", "session": 1}')
