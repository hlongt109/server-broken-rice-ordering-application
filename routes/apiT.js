var express = require('express')
var router = express.Router();

const Order = require('../models/order')

// lấy dữ liệu danh sách đơn hàng
router.get('/get-listOrder', async (req, res) => {
    try {
        const data = await Order.find()
        if(data){
            res.status(200).send(data)
        }else{
            res.json({
                "status": 400,
                "messenger": "Get order list failure",
                "data": []
            })
        }
    } catch (error) {
        console.log("Error: " + error);
    }
})

// lấy dữ liệu chi tiết đơn hàng với id
router.get('/get-orderDetails-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Order.findById(id)
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
})

// cập nhật đơn hàng

router.put('/update-Order/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const { file } = req

        const updateOrderDetail = await Order.findById(id)

        let result = null
        if(updateOrderDetail){
            updateOrderDetail.customerName = data.customerName ?? updateOrderDetail.customerName
            updateOrderDetail.customerPhone = data.customerPhone ?? updateOrderDetail.customerPhone,
            updateOrderDetail.items = data.items ?? updateOrderDetail.items,
            updateOrderDetail.status = data.status ?? updateOrderDetail.status,
            updateOrderDetail.totalPrice = data.totalPrice ?? updateOrderDetail.totalPrice,
            updateOrderDetail.houseNumber = data.houseNumber ?? updateOrderDetail.houseNumber,
            updateOrderDetail.street = data.street ?? updateOrderDetail.street,
            updateOrderDetail.ward = data.ward ?? updateOrderDetail.ward,
            updateOrderDetail.district = data.district ?? updateOrderDetail.district,
            updateOrderDetail.city = data.city ?? updateOrderDetail.city,
            updateOrderDetail.date = data.date ?? updateOrderDetail.date,
            updateOrderDetail.time = data.time ?? updateOrderDetail.time


            result = await updateOrderDetail.save()
        }

        if(result){
            res.json({
                'status': 200,
                'messenger': "Cập nhật thành công",
                'data': result
            })
        }else{
            res.json({
                'status': 400,
                'messenger': "Cập nhật thất bại",
                'data': []
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
})

module.exports = router;