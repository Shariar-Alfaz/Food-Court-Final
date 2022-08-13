<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant;
use App\Models\OrdersFoodMaping;

class Food extends Model
{
    protected $table = 'fooditem';
    protected $primaryKey='id';
    protected $foreginKey='vendor_id';
    public $timestamps=false;
    public function Restaurent()
    {
        return $this->belongsTo(Restaurent::class,'vendor_id','id');
    }
    public function OrdersFoodMaping()
    {
        return $this->hasMany(OrdersFoodMaping::class,"food_id","id");
    }
}
