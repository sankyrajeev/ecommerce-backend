const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    })


    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {

    const tagDataId = await Tag.findone({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ],
    });
    if (!tagDataId) {
      res.status(404).json({ message: "TAg with that ID Does not exist" });
    }

    ews.status(200).json(tagDataId);

  }
  catch (err) {
    res.status(500).json(err.message);

  }

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body)
    .then((tag) => {
      res.status(200).json(tag)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const soloTagData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!soloTagData) {
      res.status(404).json({ message: "Tag with that id does not exist." });
      return;
    }
    res.status(200).json(soloTagData);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
