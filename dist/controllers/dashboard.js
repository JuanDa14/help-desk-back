"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const problem_1 = __importDefault(require("../models/problem"));
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //last 5 services
        const lastProblems = yield problem_1.default.find().sort({ createdAt: -1 }).limit(5).lean();
        const currentMonth = new Date().getMonth() + 1;
        //cards
        // const usersByCurrentMonth = await User.aggregate([
        // 	{
        // 		$match: {
        // 			$expr: {
        // 				$eq: [{ $month: '$createdAt' }, currentMonth],
        // 			},
        // 		},
        // 	},
        // 	{
        // 		$group: {
        // 			_id: { $month: '$createdAt' },
        // 			total: { $sum: 1 },
        // 		},
        // 	},
        // ]);
        // const requestsByCurrentMonth = await User.aggregate([
        // 	{
        // 		$match: {
        // 			$expr: {
        // 				$eq: [{ $month: '$createdAt' }, currentMonth],
        // 			},
        // 		},
        // 	},
        // 	{
        // 		$group: {
        // 			_id: { $month: '$createdAt' },
        // 			total: { $sum: 1 },
        // 		},
        // 	},
        // ]);
        // const receiptByCurrentMonth = await ServiceReceipt.aggregate([
        // 	{
        // 		$match: {
        // 			$expr: {
        // 				$eq: [{ $month: '$createdAt' }, currentMonth],
        // 			},
        // 		},
        // 	},
        // 	{
        // 		$group: {
        // 			_id: { $month: '$createdAt' },
        // 			total: { $sum: 1 },
        // 		},
        // 	},
        // ]);
        // const totalPaymentsReceipt = await ServiceReceipt.aggregate([
        // 	{
        // 		$match: {
        // 			$expr: {
        // 				$eq: [{ $month: '$createdAt' }, currentMonth],
        // 			},
        // 		},
        // 	},
        // 	{
        // 		$group: {
        // 			_id: { $month: '$createdAt' },
        // 			total: { $sum: { $toDouble: '$amount' } },
        // 		},
        // 	},
        // ]);
        //charts
        const problemsByMonth = yield problem_1.default.aggregate([
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: 1 },
                },
            },
        ]).sort({ _id: 1 });
        return res.json({
            // users: usersByCurrentMonth[0].total || 0,
            // receipts: receiptByCurrentMonth[0].total || 0,
            // requests: requestsByCurrentMonth[0].total || 0,
            // totalReceiptByCurrentMonth: totalPaymentsReceipt[0] || { _id: currentMonth, total: 0 },
            lastProblems,
            charts: {
                problemsByMonth: problemsByMonth || [],
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getDashboard = getDashboard;
