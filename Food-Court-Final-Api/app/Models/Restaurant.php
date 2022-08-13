<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Food;
use App\Models\Order;
use App\Models\Ratings;
class Restaurant extends Model
{
    protected $table='vendors';
    protected $primaryKey ='id';
    public $timestamps=false;
    public function Foods()
    {
        return $this->hasMany(Food::class,'vendor_id','id');
    }
    public function Orders()
    {
        return $this->hasMany(Order::class,"vendor_id","id");
    }
    public function Ratings()
    {
        return $this->hasMany(Ratings::class,'vendor_id','id');
    }
}
