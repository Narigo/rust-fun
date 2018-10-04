extern crate keepass;

use keepass::{Database, Node, OpenDBError};
use std::fs::File;
use std::path::Path;

fn main() {
    let db = File::open(Path::new("test/test.kdbx"))
        .map_err(|e| OpenDBError::from(e))
        .and_then(|mut db_file| Database::open(&mut db_file, "demopass"))
        .unwrap();

    // Iterate over all Groups and Nodes
    for node in &db.root {
        match node {
            Node::Group(g) => {
                println!("Saw group '{0}'", g.name);
            }
            Node::Entry(e) => {
                let title = e.get_title().unwrap();
                let user = e.get_username().unwrap();
                // let pass = e.get_password().unwrap();
                println!("Entry '{0}': '{1}' : ---", title, user);
            }
        }
    }
}
