<?php

namespace App\Http\Controllers;

use App\Place;
use Dotenv\Result\Result;
use Illuminate\Http\Request;

class PlaceController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $places = Place::all();

        $response = [
            'status' => 200,
            'data' => $places
        ];
        
        return response()->json($response);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $response = [
            'status' => 404,
            'data' => null
        ];

        $place = Place::find($id);

        if($place) {
            $response['status'] = 200;
            $response['data'] = $place;
        }

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $response = [
            'status' => 500,
            'data' => null
        ];

        $vd = $request->validate([
            'name' => ['required', 'string'],
            'latitude' => ['required', 'string'],
            'longitude' => ['required', 'string']
        ]);

        $place = Place::create($vd);

        if ($place) {
            $response['status'] = 201;
            $response['data'] = $place;
        }

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $response = [
            'status' => 500,
            'data' => null
        ];

        $vd = $request->validate([
            'name' => ['required', 'string'],
            'latitude' => ['required', 'string'],
            'longitude' => ['required', 'string']
        ]);

        $place = Place::find($id);

        if (!$place) {
            $response['status'] = 404;
        } else {
            $place->name = $vd['name'];
            $place->latitude = $vd['latitude'];
            $place->longitude = $vd['longitude'];

            if($place->save()) {
                $response['status'] = 200;
                $response['data'] = $place;
            }
        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $response = [
            'status' => 500,
            'data' => null
        ];

        $place = Place::find($id);

        if (!$place) {
            $response['status'] = 404;
        } else {
            if ($place->delete()) {
                $response['status'] = 200;
            }
        }

        return response()->json($response);
    }

}
