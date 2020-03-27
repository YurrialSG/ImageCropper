<?php

$file = $_FILES['croppedImage'];
echo "FILE: " + $file;

$filename = $_POST['croppedImage'];
$img = $_POST['pngimageData'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
file_put_contents($filename, $data);

// if ($file) {
//     $destination_dir = __DIR__;
//     $tmp_name = $_FILES["file"]["tmp_name"];
//     $name_file = $_FILES["file"]["name"];
//     copy($tmp_name, $destination_dir . $name_file);
//     }
?>