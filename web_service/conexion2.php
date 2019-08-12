<?php

$conexion = pg_connect("host=167.99.12.53 port=5432 dbname=startel user=odoo password=odoo8") or die('Query failed: ' . pg_last_error());
pg_set_client_encoding($conexion, "UNICODE");
