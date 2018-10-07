extern crate keepass;

use keepass::{Database, Group, OpenDBError};
use std::fs::File;
use std::path::Path;

fn main() {
    let db = File::open(Path::new("keepass-diff/test/test.kdbx"))
        .map_err(|e| OpenDBError::from(e))
        .and_then(|mut db_file| Database::open(&mut db_file, "demopass"))
        .unwrap();

    // Iterate over all Groups and Nodes
    let mut accumulated = check_group(&mut Vec::new(), &mut Vec::new(), db.root);
    accumulated.sort();
    accumulated.dedup();

    println!("result");
    for entry in accumulated {
        println!("{:?}", entry);
    }
}

fn check_group(
    accumulated: &mut Vec<(Vec<String>, String, String, String)>,
    parents: &mut Vec<String>,
    current_group: Group,
) -> Vec<(Vec<String>, String, String, String)> {
    parents.push(current_group.name);
    for entry in current_group.entries {
        accumulated.push((
            parents.clone(),
            entry.get_title().unwrap().to_string(),
            entry.get_username().unwrap().to_string(),
            entry.get_password().unwrap().to_string(),
        ))
    }
    let mut all_groups_children: Vec<(Vec<String>, String, String, String)> = Vec::new();
    for next_parent in current_group.child_groups {
        let children = check_group(&mut accumulated.clone(), &mut parents.clone(), next_parent);
        all_groups_children.append(&mut children.clone())
    }
    accumulated.append(&mut all_groups_children);
    for entry in accumulated.clone() {
        println!("{:?}", entry);
    }
    accumulated.clone()
}
