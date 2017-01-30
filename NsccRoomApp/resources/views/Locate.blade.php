@extends('layouts.app')

@section('content')
    <div class="container col-md-6 col-md-offset-3">
        <div class="row">
            <h1>NSCC Room Availability App</h1>
            <h3>Find a Specific Room</h3>
            <form action="/dashboard/csstemplates" method="post">
                {{ csrf_field() }}

                <div class="form-group">
                    <label for="campus">Campus</label>
                    <select name="campus" id="campus" class="form-control">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="building">Building</label>
                    <select name="building" id="building" class="form-control">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="type">Select a Room</label>
                    <input type="text" id="type" name="type" class="form-control">
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Search</button>
                </div>
            </form>
        </div>
    </div>

@endsection