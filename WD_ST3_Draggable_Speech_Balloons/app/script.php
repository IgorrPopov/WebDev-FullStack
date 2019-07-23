<?php

if ($post['action'] === 'add_new_balloon' ) {

    $balloons[$post['id']] = [
        'position_x' => $post['position_x'],
        'position_y' => $post['position_y']
    ];

}


if ($post['action'] === 'change_balloon_text') {

    $balloons[$post['id']]['text'] = $post['text'];

    echo json_encode(['text' => $post['text']], true);

}


if ($post['action'] === 'move_balloon') {

    $balloons[$post['id']]['position_x'] = $post['position_x'];
    $balloons[$post['id']]['position_y'] = $post['position_y'];

}


if ($post['action'] === 'delete_balloon') {

    unset($balloons[$post['id']]);

}


if ($post['action'] === 'load_old_balloons') {

    echo json_encode($balloons, true);

} else {

    file_put_contents($config['pathToJsonStorage'], json_encode($balloons, JSON_PRETTY_PRINT));

}
