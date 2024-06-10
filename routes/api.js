var express = require('express');
var router = express.Router();

// model
const FoodType = require('../models/foodtype')
const Upload = require('../config/common/upload');
const Food = require('../models/food')

// api 
// ====================Food Type api=========================
router.post('/add-foodtype', Upload.single('image'), async (req, res) => {
    try {
        const data = req.body;
        const { file } = req 
        if (!file) {
            return res.status(400).json({
                "status": 400,
                "messenger": "Không có file ảnh được tải lên"
            });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const newFoodType = new FoodType({
            name: data.name,
            image: imageUrl,
        });
        const result = await newFoodType.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Loi, them khong thanh cong",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "error": error.message
        });
    }
});
// update food type
router.put('/update-foodtype/:id', Upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const { file } = req;

        let urlImg;
        const updateFoodType = await FoodType.findById(id)

        if (file && file.length > 0) {
            urlImg = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        } else {
            urlImg = updateFoodType.image;
        }
        if (updateFoodType) {
            updateFoodType.name = data.name ?? updateFoodType.name;
            updateFoodType.image = urlImg;
            const result = await updateFoodType.save();

            if (result) {
                res.json({
                    status: 200,
                    messenger: 'Cập nhật thành công',
                    data: result
                });
            } else {
                res.json({
                    status: 400,
                    messenger: 'Cập nhật không thành công',
                    data: []
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                messenger: 'Không tìm thấy loại món ăn để cập nhật',
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 500,
            'messenger': 'Lỗi server',
            'error': error.message
        });
    }
})

// get list food type
router.get("/get-foodtypes", async (req, res) => {
    try {
        const data = await FoodType.find();
        if (data) {
            res.status(200).send(data)
        } else {
            res.json({
                "status": 400,
                "messenger": "Get food type list failure",
                "data": []
            })
        }
    } catch (error) {
        console.log("Error: " + error);
    }
})

// xoa food type
router.delete('/delete-foodtype/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await FoodType.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Delete food type successfully",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Error, delete food type failure",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 500,
            'messenger': 'Lỗi server',
            'error': error.message
        });
    }
});
// get one food type
router.get('/get-foodtype-details/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await FoodType.findById(id);
        // console.log(`Found : ${JSON.stringify(data)}`);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
});
//=============== Food api====================
router.post('/add-food', Upload.single('image'), async (req, res) => {
    try {
        const data = req.body;
        const { file } = req 
        if (!file) {
            return res.status(400).json({
                "status": 400,
                "messenger": "Không có file ảnh được tải lên"
            });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        const newFood = new Food({
            category: data.category,
            name: data.name,
            foodType: data.foodType,
            price: data.price,
            image: imageUrl,
        });
        const result = await newFood.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Loi, them khong thanh cong",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "messenger": "Lỗi server",
            "error": error.message
        });
    }
});
// update food type
router.put('/update-food/:id', Upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const { file } = req;

        let urlImg;
        const updateFood = await Food.findById(id)

        if (file && file.length > 0) {
            urlImg = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        } else {
            urlImg = updateFood.image;
        }

        if (updateFood) {
            updateFood.category = data.category ?? updateFood.category,
            updateFood.foodType = data.foodType ?? updateFood.foodType,
            updateFood.name = data.name ?? updateFood.name,
            updateFood.price = data.price ?? updateFood.price
            updateFood.image = urlImg
            const result = await updateFood.save()

            if (result) {
                res.json({
                    'status': 200,
                    'messenger': 'Cập nhật thành công',
                    'data': result
                })
            } else {
                res.json({
                    'status': 400,
                    'messenger': 'Cập nhật không thành công',
                    'data': []
                })
            }
        }else {
            res.status(404).json({
                status: 404,
                messenger: 'Không tìm thấy món ăn để cập nhật',
                data: []
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 500,
            'messenger': 'Lỗi server',
            'error': error.message
        });
    }
})

// get list food type
router.get("/get-foods", async (req, res) => {
    try {
        const data = await Food.find();
        if (data) {
            res.status(200).send(data)
        } else {
            res.json({
                "status": 400,
                "messenger": "Get food list failure",
                "data": []
            })
        }
    } catch (error) {
        console.log("Error: " + error);
    }
})

// xoa food type
router.delete('/delete-food/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Food.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Delete food successfully",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Error, delete food failure",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 500,
            'messenger': 'Lỗi server',
            'error': error.message
        });
    }
});
// get one food 
router.get('/get-food-details/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Food.findById(id);
        console.log(`Found : ${JSON.stringify(data)}`);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;