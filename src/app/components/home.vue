<template>
    <div>
        <div class="wrapper">

            <div class="aside">

                <div id="box1">
                    <h2>Misión</h2>
                    <p>Sorprender día a día a nuestros consumidores con alimentos ricos y de la más alta calidad, que les faciliten
                        la vida y les brinden una experiencia de deleite y bienestar.
                    </p>
                </div>
                <div id="box2">
                    <h2>Visión</h2>
                    <p>Ser una empresa con un crecimiento sostenido y rentable, líder en la elaboración y distribución de productos
                        alimenticios de la más alta calidad para deleitar y facilitar la vida de nuestros consumidores.
                    </p>
                </div>
                <div id="box3">
                    <h2>Objetivo</h2>
                    <p>Ser los mejores surtidores de productos de toda Honduras para que la población se sienta comoda haciendo
                        sus compras en línea
                    </p>
                </div>
            </div>


            <div class="middle">
                <h1>PRODUCTOS EN DESCUENTO</h1>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="/images/coffee.png" alt="First slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Café</h5>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="/images/chocolate.jpg" alt="Second slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Chocolate</h5>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="/images/ravioli.jpg" alt="Third slide">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Ravioli</h5>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <div class="aside">
                <div class="login">
                    <form action="/login" method="post">
                        <h2>Login</h2>
                        <label>
                            <b>Usuario</b>
                        </label>
                        <input type="text" name="username" placeholder="Ingrese Usuario" />
                        <label>
                            <b>Contraseña</b>
                        </label>
                        <input type="password" name="password" placeholder="Ingrese Contraseña" />
                        <button type="submit">Ingresar</button>
                    </form>
                    <div class="text-center">
                        <a href="/signup">Crear una cuenta</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            Proyecto Programación Comercial
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

