<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Ratings;
class Customer extends Model
{
    protected $table = "customer";
    protected $primaryKey="id";
    public $timestamps = false;
    public function Orders()
    {
        return $this->hasMany(Order::class,"customer_id","id");
    }
    public function Ratings()
    {
        return $this->hasMany(Ratings::class,'customer_id','id');
    }
}
