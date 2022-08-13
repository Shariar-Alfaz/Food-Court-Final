<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Food;

class OrdersFoodMaping extends Model
{
    protected $table="orders_food_map";
    public $timestamps=false;
    public function Food()
    {
        return $this->belongsTo(Food::class,"food_id","id");
    }
    public function Order()
    {
        return $this->belongsTo(Order::class,"order_id","id");
    }
}
