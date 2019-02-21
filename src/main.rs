#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
extern crate rocket_contrib;
use rocket::response::{NamedFile, Redirect};
//use rocket_contrib::serve::StaticFiles;
use std::path::{PathBuf, Path};
use rocket::http::RawStr;

#[get("/")]
fn index() -> Redirect {
    Redirect::to("/index?vid=test")
}

#[get("/index?<vid>", rank = 2)]
fn vpage(vid: &RawStr) -> Option<NamedFile> {
    NamedFile::open(Path::new("view/index.html")).ok()
}

#[get("/<file..>", rank = 3)]
fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("view/").join(file)).ok()
}

fn main() {
    rocket::ignite().mount("/", routes![index, vpage, files]).launch();
}

//ffmpeg -f dshow -i video="HD Webcam" -vcodec libx264 -f flv rtmp://127.0.0.1/hls/test
//  ffmpeg -f dshow -i video="VGA2USB V2U967295" -vcodec libx264 -vf scale=840:-1 -f flv rtmp://127.0.0.1/hls/test