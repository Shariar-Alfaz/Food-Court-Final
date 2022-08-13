<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Restaurant;
Use App\Models\OrdersFoodMaping;

class Order extends Model
{
    protected $table="orders";
    protected $primarykey="id";
    public $timestamps = false;
    public function Restaurant()
    {
        return $this->belongsTo(Restaurant::class,"vendor_id","id");
    }
    public function Customer()
    {
        return $this->belongsTo(Customer::class,"customer_id","id");
    }
    public function OrdersFoodMaping()
    {
        return $this->hasMany(OrdersFoodMaping::class,"order_id","id");
    }
}
