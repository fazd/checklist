const router = require('express').Router({
  mergeParams: true,
});
const { auth, owner } = require('../auth');
const controller = require('./controller');
const { sanitizers } = require('./model');
/*
 * /api/tasks/ POST  - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id  GET - READ ONE
 * /api/tasks/:id  PUT - UPDATE
 * /api/tasks/:id  DELETE  - DELETE
 */
router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.parentId, sanitizers, controller.create)
  /**
   *  @Swagger
   *  /tasks/:
   *    get:
   *      tags:
   *        -Tasks
   *      description: Get all tasks
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          schema:
   *            type: array
   *            items:
   *              type: object
   *              properties:
   *                id:
   *                  type: string
   *                title:
   *                  type: string
   *                completed:
   *                  type: boolean
   *                description:
   *                  type: string
   *                url:
   *                  type: string
   *                dueDate:
   *                  type: string
   *                  format: date-time
   *                created-at:
   *                  type: string
   *                  format: date-time
   *                updated-at:
   *                  type: string
   *                  format: date-time
   * 
   * 
   * 
   */
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, owner, controller.parentId, sanitizers, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

module.exports = router;
