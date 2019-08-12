<?php

$conexion = pg_connect("host=localhost port=5432 dbname=Startel user=postgres password=gomez") or die('Query failed: ' . pg_last_error());
pg_set_client_encoding($conexion, "UNICODE");
