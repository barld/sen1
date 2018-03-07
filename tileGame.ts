import { Fun } from "./fun";

type terain = "terain";
type town = "town";
type army = "army";

type TileType = terain | town | army;

type Tile<a extends TileType>  = {kind: a};
let Tile = <a extends TileType>(type: a): Tile<a> => ({kind: type});

let map_tile = 
    <a extends TileType,b extends TileType>(f: Fun<a,b>) => Fun<Tile<a>, Tile<b>>(
        tile => ({...tile, kind: f.f(tile.kind)}));


