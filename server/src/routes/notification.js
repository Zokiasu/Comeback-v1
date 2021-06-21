import { Router } from 'express';
import { NOTIFICATION_TYPE } from '../constants';
import { queriesToDict, whereDay } from '../helpers/routes';

const router = Router();

router.get('/', async(req, res) => {
    const notifications = await req.context.models.Notification.findAll({
        ...queriesToDict(req.query),
        include: [
            req.context.models.User,
        ],
    });
    return res.send(notifications);
});

router.post('/', async(req, res) => {
    const notifications = []
    const today = new Date();

    const releases = await req.context.models.Release.findAll({
        where: whereDay(today),
        include: [{ model: req.context.models.Artist, include: [{ model: req.context.models.User, as: 'followers' }] }, { model: req.context.models.User, as: 'followers' }]
    });
    const startingEvents = await req.context.models.Happening.findAll({
        where: whereDay(today, 'startDate'),
        include: [{ model: req.context.models.Artist, include: [{ model: req.context.models.User, as: 'followers' }] }]
    });
    const endingEvents = await req.context.models.Happening.findAll({
        where: whereDay(today, 'endDate'),
        include: [{ model: req.context.models.Artist, include: [{ model: req.context.models.User, as: 'followers' }] }]
    });

    for (const release of releases) {
        const releaseNotification = await req.context.models.Notification.create({
            type: NOTIFICATION_TYPE.RELEASE,
            title: `${release.name}: OUT NOW`,
            message: `${release.name}: is out today`,
            url: `releases/${release.id}`,
            date: release.date,
        });
        releaseNotification.addUsers(release.followers);
        notifications.push(releaseNotification);
        for (const artist of release.artists) {
            const artistNotification = await req.context.models.Notification.create({
                type: NOTIFICATION_TYPE.RELEASE,
                title: `${artist.name}: NEW ${release.type}`,
                message: `${release.name}: is out today`,
                url: `releases/${release.id}`,
                date: release.date,
            });
            artistNotification.addUsers(artist.followers);
            notifications.push(artistNotification);
        }
    }

    for (const startingEvent of startingEvents) {
        for (const artist of startingEvent.artists) {
            const startingEventNotification = await req.context.models.Notification.create({
                type: NOTIFICATION_TYPE.ARTIST,
                title: `${artist.name}: EVENT STARTS`,
                message: `${startingEvent.name}: starts today`,
                url: `events/${startingEvent.id}`,
                date: startingEvent.startDate,
                users: artist.followers
            });
            startingEventNotification.addUsers(artist.followers);
            notifications.push(startingEventNotification);
        }
    }

    for (const endingEvent of endingEvents) {
        for (const artist of endingEvent.artists) {
            const endingEventNotification = await req.context.models.Notification.create({
                type: NOTIFICATION_TYPE.ARTIST,
                title: `${artist.name}: EVENT ENDS`,
                message: `${endingEvent.name}: ends today`,
                url: `events/${endingEvent.id}`,
                date: endingEvent.endDate,
                users: artist.followers
            });
            endingEventNotification.addUsers(artist.followers);
            notifications.push(endingEventNotification);
        }
    }

    return res.send(notifications);
});

export default router;