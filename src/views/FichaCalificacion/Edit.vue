<template>
  <div class="row justify-content-center mt-1">
    <div class="col-md-11">
      <h3>Registro de Ficha de calificaciones</h3>
      <hr />
      <div class="container text-center mb-4">
        <div class="row row-cols-auto">
          <div class="col">
            <router-link :to="{ path: '/registermenu' }"> Menú de registros </router-link>
          </div>
          >
          <div class="col">
            <router-link :to="{ path: '/cards' }"> Fichas de calificaciones </router-link>
          </div>
          >
          <div class="col">
            <a class="text-dark" href="#">Nuevo registro</a>
          </div>
        </div>
      </div>
      <div class="card border border-success">
        <div class="card-body">
          <form enctype="multipart/form-data">
            <div class="row">
              <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
              </p>
              <h4>Información de la Ficha</h4>
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Estudiante</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <input
                    class="form-control"
                    autofocus
                    id="codigoEstudiante"
                    required
                    v-model="busqueda"
                    @input="buscarEstudiantes"
                    type="text"
                    placeholder="Buscar estudiante"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
                <ul class="list-group listaFiltro" v-if="mostrarLista">
                  <li
                    v-for="estudiante in visibilidad"
                    :key="estudiante.codigoEstudiante"
                    @click="seleccionarEstudiante(estudiante)"
                  >
                    {{ estudiante.nombreEstudiante }} {{ estudiante.apellidoEstudiante }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Ciclo escolar</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="cicloEscolar"
                    required
                    type="date"
                    class="form-control"
                    v-model="cicloEscolar"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Establecimiento
                  <span
                    ><i
                      data-bs-toggle="modal"
                      data-bs-target="#modalEstablecimiento"
                      style="font-size: 14px"
                      class="fas fa-circle-plus"
                      @click="noMostrarAlertas(), openModal(2)"
                    ></i></span
                ></label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-school"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoEstablecimiento"
                    v-model="codigoEstablecimiento"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona establecimiento</option>
                    <template
                      v-for="tipo in establecimientos"
                      :key="tipo.codigoEstablecimiento"
                    >
                      <option :value="tipo.codigoEstablecimiento">
                        {{ tipo.nombreEstablecimiento }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Nivel Academico</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-graduation-cap"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="tipocliente"
                    v-model="codigoNivelAcademico"
                    @change="opcionSeleccionada"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>
                      Selecciona tipo nivel academico
                    </option>
                    <template
                      v-for="tipo in nivelesAcademicos"
                      :key="tipo.codigoNivelAcademico"
                    >
                      <option :value="tipo.codigoNivelAcademico">
                        {{ tipo.nombreNivelAcademico }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Grado</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-stairs"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoGrado"
                    v-model="codigoGrado"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona el grado</option>
                    <template v-for="tipo in grados" :key="tipo.codigoGrado">
                      <option :value="tipo.codigoGrado">
                        {{ tipo.nombreGrado }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-chart-line"></i>
                  </span>
                  <input
                    autofocus
                    id="nombreEstudiante"
                    type="number"
                    class="form-control"
                    v-model="bloque"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <label for="exampleFormControlInput1" class="form-label"
                  >Carrera
                  <span
                    ><i
                      data-bs-toggle="modal"
                      data-bs-target="#modalCarrera"
                      style="font-size: 14px"
                      class="fas fa-circle-plus"
                      @click="noMostrarAlertas(), openModal(2)"
                      :disabled="deshabilitarComponentes"
                    ></i></span
                ></label>

                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-building"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoCarrera"
                    v-model="codigoCarrera"
                    :disabled="bloquearComponenteCarrera"
                  >
                    <option value="0" selected>Selecciona carrera</option>
                    <template v-for="tipo in carrerasFiltradas" :key="tipo.codigoCarrera">
                      <option :value="tipo.codigoCarrera">
                        {{ tipo.nombreCarrera }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label">Modalidad</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-home"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoModalidad"
                    v-model="codigoModalidadEstudio"
                    required
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona modalidad</option>
                    <template
                      v-for="tipo in modalidadesEstudios"
                      :key="tipo.codigoModalidadEstudio"
                    >
                      <option :value="tipo.codigoModalidadEstudio">
                        {{ tipo.nombreModalidadEstudio }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <h4>Información de los cursos</h4>
              <div class="row">
                <div
                  class="card p-0 m-2"
                  style="width: 19rem"
                  v-for="item in informacionFichaCalificacion.bloques"
                >
                  <div
                    class="card-header"
                    :style="{ backgroundColor: obtenerColor(item.codigoPromedio) }"
                  >
                    <div class="row justify-content-between">
                      <div class="col">Bloque: {{ item.bloque }}</div>
                      <div class="col text-end">
                        <i
                          @click="
                            EliminarBloque(
                              item.bloque,
                              item.codigoFichaCalificacionDetalle
                            )
                          "
                          class="fas fa-trash"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Promedio: {{ item.promedio }}</h5>

                    <!--TABLA-->
                    <table class="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Curso</th>
                          <th scope="col">Nota</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(materia, index) in item.materias" :key="index">
                          <th scope="row" class="text-center">{{ index + 1 }}</th>
                          <td>{{ materia.nombreCurso }}</td>
                          <td>{{ materia.nota }}</td>
                          <td>
                            <!-- Puedes agregar una acción aquí si es necesario -->
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#modalNotaCurso"
                              @click="
                                noMostrarAlertas(),
                                  openModal(
                                    1,
                                    materia.codigoCursoFichaCalificacion,
                                    materia.nota
                                  )
                              "
                              class="fas fa-edit mr-1"
                            ></i>
                            <i
                              @click="
                                confirmDelete(
                                  materia.nombreCurso,
                                  materia.codigoCursoFichaCalificacion
                                )
                              "
                              class="fas fa-trash"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--TABLA-->
                  </div>
                </div>
              </div>

              <div class="row agregar cursos mt-3">
                <h4>Asignar nuevos cursos</h4>
                <div class="col-md-4">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Curso
                    <span
                      ><i
                        data-bs-toggle="modal"
                        data-bs-target="#modalCurso"
                        style="font-size: 14px"
                        class="fas fa-circle-plus"
                        @click="noMostrarAlertas(), openModal(2)"
                        :disabled="deshabilitarComponentes"
                      ></i></span
                  ></label>

                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-building"></i>
                    </span>
                    <select
                      class="form-control form-select"
                      id="codigoCurso"
                      v-model="codigoCurso"
                      :disabled="deshabilitarComponentes"
                    >
                      <option value="" disabled selected>Selecciona curso</option>
                      <template v-for="tipo in cursosFiltrados" :key="tipo.codigoCurso">
                        <option :value="tipo.codigoCurso">
                          {{ tipo.nombreCurso }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">Nota</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-arrow-up-9-1"></i>
                    </span>
                    <input
                      autofocus
                      id="notaCurso"
                      type="number"
                      class="form-control text-center"
                      v-model="notaInput"
                      :disabled="deshabilitarComponentes"
                    />
                  </div>
                </div>

                <div class="col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i class="fa-solid fa-chart-line"></i>
                    </span>
                    <select
                      class="form-control form-select"
                      id="codigoCurso"
                      v-model="codigoFichaDetalle"
                      :disabled="deshabilitarComponentes"
                    >
                      <option value="" disabled selected>Selecciona el bloque</option>
                      <template
                        v-for="bloque in informacionFichaCalificacion.bloques"
                        :key="bloque.bloque"
                      >
                        <option :value="bloque.codigoFichaCalificacionDetalle">
                          {{ bloque.bloque }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>

                <div class="col-md-2">
                  <label for="exampleFormControlInput1" class="form-label">Agregar</label>
                  <div class="input-group">
                    <span class="input-group-text" @click.prevent="asignarNuevoCurso">
                      <i style="font-size: 24px" class="fa-solid fa-circle-plus"></i>
                    </span>
                  </div>
                </div>
                <div class="alert alert-danger" role="alert" v-show="cursoYaExiste">
                  El curso seleccionado ya existe en el bloque.
                </div>
              </div>
            </div>

            <div class="row">
              <p class="placeholder-glow" v-if="deshabilitarComponentes">
                <span class="placeholder col-12 text-success"></span>
              </p>
              <h4>Actualizar fotografías</h4>

              <div class="col-md-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fotografía del estudiante</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagen"
                    @change="handleFileChange"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Imagen de ficha</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagenFicha"
                    @change="handleFileChangeFicha"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Imagen de carta</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-image"></i>
                  </span>
                  <input
                    class="form-control"
                    type="file"
                    id="imagenCarta"
                    @change="handleFileChangeCarta"
                    accept="image/*"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <label for="exampleFormControlInput1" class="form-label">Bloque</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-chart-line"></i>
                  </span>
                  <select
                    class="form-control form-select"
                    id="codigoCurso"
                    v-model="codigoBloqueImg"
                    :disabled="deshabilitarComponentes"
                  >
                    <option value="" disabled selected>Selecciona el bloque</option>
                    <template
                      v-for="bloque in informacionFichaCalificacion.bloques"
                      :key="bloque.bloque"
                    >
                      <option :value="bloque.codigoFichaCalificacionDetalle">
                        {{ bloque.bloque }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="col-md-1">
                <label for="exampleFormControlInput1" class="form-label"
                  >Actualizar</label
                >
                <div class="input-group">
                  <span class="input-group-text" @click.prevent="actualizarImagenes">
                    <i style="font-size: 24px" class="fa-solid fa-circle-check"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="exampleFormControlInput1" class="form-label"
                  >Fecha de registro</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
                  <input
                    autofocus
                    id="fechaRegistro"
                    v-model="fechaRegistro"
                    required
                    type="date"
                    class="form-control"
                    :disabled="deshabilitarComponentes"
                  />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <p v-if="deshabilitarComponentes">Cargando...</p>
              <div
                v-if="deshabilitarComponentes"
                class="spinner-border text-dark"
                role="status"
              ></div>

              <RouterLink
                :to="{ name: 'registermenu' }"
                type="button"
                class="btn btn-outline-primary"
              >
                Cancelar
              </RouterLink>
              <button
                type="submit"
                @click.prevent="submitForm"
                class="btn btn-primary text-light"
                :disabled="deshabilitarComponentes"
              >
                <i class="fa-solid fa-save"></i> Guardar registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!--Modal para establecimientos-->
  <Modal :id="'modalEstablecimiento'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El establecimiento fue creado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar el establecimiento!
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
      <div class="text-center pb-3" v-show="mostrarLoading">
        <div class="card-body">
          <img
            style="max-width: 25px; max-height: 25px"
            src="/loading.gif"
            alt="img-fluid"
          />
        </div>
      </div>
      <div class="row col-11">
        <form @submit.prevent="save(1)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formEstablecimiento.nombreEstablecimiento"
              placeholder="Establecimiento"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
  <Modal :id="'modalCarrera'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡La carrera fue creada correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar la carrera!
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
      <div class="text-center pb-3" v-show="mostrarLoading">
        <div class="card-body">
          <img
            style="max-width: 25px; max-height: 25px"
            src="/loading.gif"
            alt="img-fluid"
          />
        </div>
      </div>
      <div class="row col-11">
        <form @submit.prevent="save(2)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formCarrera.nombreCarrera"
              placeholder="Carrera"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-8">
              <select
                class="form-control form-select"
                id="codigoComunidad"
                v-model="formCarrera.codigoNivelAcademico"
              >
                <option value="" disabled selected>Selecciona el nivel académico</option>
                <template
                  v-for="tipo in nivelesAcademicos"
                  :key="tipo.codigoNivelAcademico"
                >
                  <option :value="tipo.codigoNivelAcademico">
                    {{ tipo.nombreNivelAcademico }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
  <Modal :id="'modalCurso'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El curso fue creado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar guardar el curso!
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
      <div class="text-center pb-3" v-show="mostrarLoading">
        <div class="card-body">
          <img
            style="max-width: 25px; max-height: 25px"
            src="/loading.gif"
            alt="img-fluid"
          />
        </div>
      </div>
      <div class="row col-11">
        <form @submit.prevent="save(3)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="text"
              v-model="formCurso.nombreCurso"
              placeholder="Curso"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <div class="d-grid col-8">
              <select
                class="form-control form-select"
                id="codigoComunidad"
                v-model="formCurso.codigoNivelAcademico"
              >
                <option value="" disabled selected>Selecciona el nivel académico</option>
                <template
                  v-for="tipo in nivelesAcademicos"
                  :key="tipo.codigoNivelAcademico"
                >
                  <option :value="tipo.codigoNivelAcademico">
                    {{ tipo.nombreNivelAcademico }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
  <!--Moda para cambiar notas-->
  <Modal :id="'modalNotaCurso'" :title="title">
    <div class="modal-body">
      <div
        class="alert alert-success text-center"
        role="alert"
        v-show="mostrarAlertaSuccess"
      >
        ¡El nota fue actualizado correctamente!
      </div>
      <div
        class="alert alert-danger text-center"
        role="alert"
        v-show="mostrarAlertaDanger"
      >
        ¡Hubo un error al intentar actualizar la nota!
        <p>Por favor, intente nuevamente más tarde.</p>
      </div>
      <div class="text-center pb-3" v-show="mostrarLoading">
        <div class="card-body">
          <img
            style="max-width: 25px; max-height: 25px"
            src="/loading.gif"
            alt="img-fluid"
          />
        </div>
      </div>
      <div class="row col-11">
        <form @submit.prevent="save(4)">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fa-solid fa-building"></i>
            </span>
            <input
              autofocus
              type="number"
              v-model="nuevaNotaCalificacion"
              min="1"
              max="100"
              placeholder="Nota"
              required
              class="form-control"
              ref="nameInput"
            />
          </div>
          <div class="d-grid col-6 mx-auto">
            <button class="btn btn-dark">
              <i class="fa-solid fa-save"></i> Registrar
            </button>
          </div>
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary" ref="close" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import Modal from "../../components/Modal.vue";
import Datepicker from "vue3-datepicker";
const baseApiBackend = import.meta.env.VITE_BACKEND_API;
const route = useRoute();
const parametro = route.params.codigoFichaCalificacion;

const authStore = useAuthStore();
axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.authToken}`;

//Disable
const title = ref("Nuevo Registro");
const mostrarAlertaSuccess = ref(false);
const mostrarAlertaDanger = ref(false);
const mostrarLoading = ref(false);

const deshabilitarComponentes = ref(false);
const cursoYaExiste = ref(false);

const noMostrarAlertas = () => {
  mostrarAlertaSuccess.value = false;
  mostrarAlertaDanger.value = false;
  mostrarLoading.value = false;
  formCarrera.value.nombreCarrera = "";
  formCarrera.value.codigoNivelAcademico = "";
  formCurso.value.nombreCurso = "";
  formCurso.value.codigoNivelAcademico = "";
  formEstablecimiento.value.nombreEstablecimiento = "";
};

const formEstablecimiento = ref({
  nombreEstablecimiento: "",
  estatus: "A",
});
const formCarrera = ref({
  codigoNivelAcademico: 0,
  nombreCarrera: "",
  estatus: "A",
});

const formCurso = ref({
  codigoNivelAcademico: 0,
  nombreCurso: "",
  estatus: "A",
});

const formAsignarNuevoCurso = ref({
  codigoFichaCalificacionDetalle: 0,
  codigoCurso: "",
  nota: "",
  estatus: "A",
});

const nuevaNotaCalificacion = ref(0);
const codigoCursoFichaCalificacion = ref(0);
const openModal = (opcion, codigoCursoFichaCalifiacion, notaCalifiacion) => {
  if (opcion == 1) {
    title.value = "Actualizar Nota";
    codigoCursoFichaCalificacion.value = codigoCursoFichaCalifiacion;
    nuevaNotaCalificacion.value = notaCalifiacion;
    console.log(codigoCursoFichaCalificacion.value);
  } else {
    title.value = "Nuevo Registro";
  }
};
const save = async (opcion) => {
  if (opcion == 1) {
    try {
      mostrarLoading.value = true;
      const response = await axios.post(
        "/api/establecimiento/create",
        formEstablecimiento.value
      );
      mostrarLoading.value = false;
      if ((response.data.estatus = true)) {
        mostrarAlertaSuccess.value = true;
        await getEstablecimientos();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  } else if (opcion == 2) {
    try {
      mostrarLoading.value = true;
      const response = await axios.post("/api/carrera/create", formCarrera.value);
      mostrarLoading.value = false;
      if ((response.data.estatus = true)) {
        mostrarAlertaSuccess.value = true;
        await getCarreras();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  } else if (opcion == 3) {
    try {
      mostrarLoading.value = true;
      const response = await axios.post("/api/curso/create", formCurso.value);
      mostrarLoading.value = false;
      if ((response.data.estatus = true)) {
        mostrarAlertaSuccess.value = true;
        await getCursos();
        opcionSeleccionada();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  } else {
    try {
      mostrarLoading.value = true;
      const response = await axios.put(
        `/api/fichaCalificacion/actualizarNotaCurso/${codigoCursoFichaCalificacion.value}?notaCalificacion=${nuevaNotaCalificacion.value}`
      );
      mostrarLoading.value = false;
      if ((response.data.estatus = true)) {
        mostrarAlertaSuccess.value = true;
        getEncabezadoFichaCalificacion();
      } else {
        mostrarAlertaDanger.value = true;
      }
    } catch {
      mostrarLoading.value = false;
      mostrarAlertaDanger.value = true;
    }
  }
};

const informacionFichaCalificacion = ref([]);
const fechaRegistro = ref("");
const cicloEscolar = ref(0);
const codigoEstablecimiento = ref("");
const codigoNivelAcademico = ref("");
const codigoModalidadEstudio = ref("");
const codigoGrado = ref("");
const codigoEstudiante = ref(0);
const codigoCarrera = ref("");
const codigoCurso = ref(0);
const codigoFichaDetalle = ref("");
const bloque = ref(1);
//fotografias
const imgEstudiante = ref(null);
const imgFicha = ref(null);
const imgCarta = ref(null);
const estatusFicha = ref("");

//Form para actualizar datos
const formActualizarFicha = ref({
  codigoEstudiante: "",
  codigoEstablecimiento: "",
  codigoNivelAcademico: "",
  codigoGrado: "",
  codigoCarrera: "",
  cicloEscolar: "",
  fechaRegistro: "",
  codigoModalidadEstudio: "",
  estatus: "",
});

//boton
const cursosNotas = ref([]);
const busqueda = ref("");
const mostrarLista = ref(true);

//Lista de datos
const nivelesAcademicos = ref([]);
const grados = ref([]);
const carreras = ref([]);
const establecimientos = ref([]);
const cursos = ref([]);

//ESTUDIANTE
const estudiantes = ref([]);
const visibilidad = ref([]);

const notaInput = ref(0);
const asignarNuevoCurso = async () => {
  cursoYaExiste.value = false;
  if (
    notaInput.value !== 0 &&
    notaInput.value !== "" &&
    codigoCurso.value !== 0 &&
    codigoFichaDetalle.value !== 0
  ) {
    deshabilitarComponentes.value = true;
    formAsignarNuevoCurso.value.codigoFichaCalificacionDetalle = codigoFichaDetalle.value;
    formAsignarNuevoCurso.value.codigoCurso = codigoCurso.value;
    formAsignarNuevoCurso.value.nota = notaInput.value;

    const cursoEncontrado = buscarCursoEnBloque(
      codigoFichaDetalle.value,
      codigoCurso.value
    );

    if (cursoEncontrado) {
      cursoYaExiste.value = true;
      deshabilitarComponentes.value = false;
    } else {
      try {
        const response = await axios.post(
          "/api/fichaCalificacion/asignarNuevocurso",
          formAsignarNuevoCurso.value
        );
        if ((response.data.estatus = true)) {
          Swal.fire({
            title: "¡Creado!",
            text: `El curso ha sido asignado correctamente.`,
            icon: "success",
          });

          await getEncabezadoFichaCalificacion();
          deshabilitarComponentes.value = false;
        } else {
          Swal.fire({
            title: "Error!",
            text: `Hubo un error al intentar asignar el nuevo curso.`,
            icon: "error",
          });
          deshabilitarComponentes.value = false;
        }
      } catch {
        deshabilitarComponentes.value = false;
        Swal.fire({
          title: "Error!",
          text: `Hubo un error al intentar asignar el nuevo curso.`,
          icon: "error",
        });
      }
    }
  }
};

function getNombreCurso(codigo) {
  // Función para obtener el nombre del curso basado en el código
  const curso = cursos.value.find((curso) => curso.codigoCurso === codigo);
  return curso ? curso.nombreCurso : "";
}

// // Método para buscar un curso en un bloque específico por medio de codigoCurso
function buscarCursoEnBloque(codigoFichaCalificacionDetalle, codigoCurso) {
  // Buscar el bloque que corresponde al codigoFichaCalificacionDetalle
  const bloque = informacionFichaCalificacion.value.bloques.find(
    (b) => b.codigoFichaCalificacionDetalle === codigoFichaCalificacionDetalle
  );
  console.log(bloque);
  if (!bloque) {
    console.log("Bloque no encontrado.");
    return null;
  }

  // Buscar el curso en la lista de materias dentro de ese bloque
  const curso = bloque.materias.find((materia) => materia.codigoCurso === codigoCurso);

  // Si se encuentra, retornarlo, sino retorna null
  return curso ? curso : null;
}

const eliminarCurso = (index) => {
  cursosNotas.value.splice(index, 1);
};

//Para buscar texto
const buscarEstudiantes = () => {
  const textoBusqueda = busqueda.value.toLowerCase().trim();
  if (textoBusqueda !== "") {
    //return []; // Si la búsqueda está vacía, devuelve una lista vacía
    mostrarLista.value = true;
    visibilidad.value = estudiantes.value.filter((estudiante) =>
      (
        estudiante.nombreEstudiante.toLowerCase() +
        " " +
        estudiante.apellidoEstudiante.toLowerCase()
      ).includes(textoBusqueda.toLowerCase())
    );
  }
};

//nueva
const idEstudiante = ref(0);
const seleccionarEstudiante = (estudiante) => {
  idEstudiante.value = estudiante.codigoEstudiante;
  busqueda.value = estudiante.nombreEstudiante + " " + estudiante.apellidoEstudiante;
  mostrarLista.value = false; // Ocultar la lista después de seleccionar
};

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getEncabezadoFichaCalificacion = async () => {
  try {
    deshabilitarComponentes.value = true;
    const response = await axios.get(
      `/api/fichaCalificacion/informacionActualizarFicha/${parametro}`
    );
    informacionFichaCalificacion.value = response.data;
    idEstudiante.value = response.data.codigoEstudiante;
    busqueda.value =
      response.data.nombreEstudiante + " " + response.data.apellidoEstudiante;
    fechaRegistro.value = formatFecha(response.data.fechaRegistro);
    cicloEscolar.value = formatFecha(response.data.cicloEscolar);
    codigoEstablecimiento.value = response.data.codigoEstablecimiento;
    codigoNivelAcademico.value = response.data.codigoNivelAcademico;
    codigoModalidadEstudio.value = response.data.codigoModalidadEstudio;
    codigoGrado.value = response.data.codigoGrado;
    codigoCarrera.value = response.data.codigoCarrera;
    estatusFicha.value = response.data.estatus;
    opcionSeleccionada();
    deshabilitarComponentes.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la información del encabezado de la ficha de calificación.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//Obtener color encabezado de las tarjetas
//#region Color header card
const bgColorPromedioRojo = ref("#FF0000");
const bgColorPromedioAmarrillo = ref("#FFFF00");
const bgColorPromedioVerde = ref("#00FF00");

const obtenerColor = (codigoPromedio) => {
  if (codigoPromedio === 1) {
    return bgColorPromedioRojo.value;
  } else if (codigoPromedio === 2) {
    return bgColorPromedioAmarrillo.value;
  } else if (codigoPromedio === 3) {
    return bgColorPromedioVerde.value;
  }
  return "white"; // Color por defecto si no coincide
};
//#endregion

const getNivelesAcademicos = async () => {
  try {
    const response = await axios.get("/api/nivelAcademico/selectAll");
    nivelesAcademicos.value = response.data.filter(
      (nivelAcademico) => nivelAcademico.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de niveles académicos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getGrados = async () => {
  try {
    const response = await axios.get("/api/grado/selectAll");
    grados.value = response.data.filter(
      (grado) => grado.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de grados académicos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const carrerasFiltradas = ref("");
const getCarreras = async () => {
  try {
    const response = await axios.get("/api/carrera/selectAll");
    carreras.value = response.data.filter(
      (carrera) => carrera.estatus.trim().toUpperCase() === "A"
    );
    carrerasFiltradas.value = carreras.value;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de carreras.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getEstablecimientos = async () => {
  try {
    const response = await axios.get("/api/establecimiento/selectAll");
    establecimientos.value = response.data.filter(
      (establecimiento) => establecimiento.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de establecimientos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const cursosFiltrados = ref("");
const getCursos = async () => {
  try {
    const response = await axios.get("/api/curso/selectAll");
    cursos.value = response.data.filter(
      (curso) => curso.estatus.trim().toUpperCase() === "A"
    );
    cursosFiltrados.value = cursos.value;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de los cursos.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const getEstudiantes = async () => {
  try {
    const response = await axios.get("/api/estudiante/selectAll");
    estudiantes.value = response.data.filter(
      (estudiante) => estudiante.estado.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de estudiantes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

const modalidadesEstudios = ref();
const getModalidadesEstudios = async () => {
  try {
    const response = await axios.get("/api/modalidadEstudio/selectAll");
    modalidadesEstudios.value = response.data.filter(
      (modalidad) => modalidad.estatus.trim().toUpperCase() === "A"
    );
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar obtener la lista de modalidades de estudios.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

onMounted(async () => {
  getEstudiantes();
  getEncabezadoFichaCalificacion();
  getNivelesAcademicos();
  getGrados();
  getCarreras();
  getEstablecimientos();
  getCursos();

  getModalidadesEstudios();
});

//ENVIAR FORMULARIO
const submitForm = async () => {
  if (
    !fechaRegistro.value ||
    !codigoEstablecimiento.value ||
    !cursosNotas.value ||
    !idEstudiante.value ||
    !codigoNivelAcademico.value ||
    !codigoGrado.value ||
    !codigoModalidadEstudio.value
  ) {
    return Swal.fire({
      icon: "warning",
      title: "Completa todos los campos antes de enviar",
      showConfirmButton: true, // Ocultar el botón "Aceptar"
      timer: 1500, // Tiempo en milisegundos antes de que se cierre automáticamente
    });
  }
  deshabilitarComponentes.value = true;

  if (codigoCarrera.value > 0 || codigoCarrera.value != "") {
    codigoCarrera.value = codigoCarrera.value;
  } else {
    codigoCarrera.value = 0;
  }

  formActualizarFicha.value.codigoEstudiante = idEstudiante.value;
  formActualizarFicha.value.codigoEstablecimiento = codigoEstablecimiento.value;
  formActualizarFicha.value.codigoNivelAcademico = codigoNivelAcademico.value;
  formActualizarFicha.value.codigoGrado = codigoGrado.value;
  formActualizarFicha.value.codigoCarrera = codigoCarrera.value;
  formActualizarFicha.value.codigoModalidadEstudio = codigoModalidadEstudio.value;
  formActualizarFicha.value.cicloEscolar = cicloEscolar.value;
  formActualizarFicha.value.fechaRegistro = fechaRegistro.value;
  formActualizarFicha.value.estatus = estatusFicha.value;
  console.log(formActualizarFicha.value);
  try {
    const response = await axios.put(
      `/api/fichaCalificacion/actualizarFicha/${parametro}`,
      formActualizarFicha.value
    );

    if (response.data.status == true) {
      Swal.fire({
        title: "¡Actualizado!",
        text: `La ficha de calificaciones se ha actualizado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      deshabilitarComponentes.value = false;
    } else {
      Swal.fire({
        title: "Error",
        text: `Hubo un error al intentar actualizar la ficha de calificaciones.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });

      deshabilitarComponentes.value = false;
    }
  } catch (error) {
    deshabilitarComponentes.value = false;
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar actualizar la ficha de calificaciones catch.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//watch(codigoNivelAcademico, (newValue) => {
//  if (!newValue) {
//    //checkbox deshabilitado
//    alert("Nivel Academico sin valor...")
//  } else {
//    //checkbox habilitado
//    alert("Cambio de valor de nivel academico...")
//  }
//  mapeoDeDato(estudiantesSeleccionados.value);
//});

const bloquearComponenteCarrera = ref(true);
const opcionSeleccionada = () => {
  if (codigoNivelAcademico.value >= 3) {
    bloquearComponenteCarrera.value = false;
  } else {
    bloquearComponenteCarrera.value = true;
    codigoCarrera.value = 0;
  }
  cursosFiltrados.value = cursos.value.filter(
    (curso) => curso.codigoNivelAcademico == codigoNivelAcademico.value
  );
  carrerasFiltradas.value = carreras.value.filter(
    (carrera) => carrera.codigoNivelAcademico == codigoNivelAcademico.value
  );
};

//Eliminar curso
const confirmDelete = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deleteCurso(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteCurso = async (nombre, codigo) => {
  try {
    const response = await axios.delete(`/api/fichaCalificacion/DeleteCurso/${codigo}`);
    Swal.fire({
      title: "Eliminado!",
      text: `El curso ${nombre} ha sido eliminado.`,
      icon: "success",
    });
    getEncabezadoFichaCalificacion();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar el curso ${nombre}.`,
      icon: "error",
      footer: error.message || "Por favor, intente nuevamente más tarde.",
    });
  }
};

//Eliminar bloque
const EliminarBloque = (nombre, codigo) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar el blque: ${nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al método que eliminará el registro
      deleteBloque(nombre, codigo);
    }
  });
};

// Método de eliminación (este es el que ya tienes implementado)
const deleteBloque = async (nombre, codigo) => {
  try {
    const response = await axios.delete(`/api/fichaCalificacion/DeleteBloque/${codigo}`);
    Swal.fire({
      title: "Eliminado!",
      text: `El bloque ${nombre} ha sido eliminado.`,
      icon: "success",
    });
    getEncabezadoFichaCalificacion();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar eliminar el bloque ${nombre}.`,
      icon: "error",
      footer: error.message || "Por favor, intente nuevamente más tarde.",
    });
  }
};

//#endregion sección de fotografías
const handleFileChange = (event) => {
  imgEstudiante.value = event.target.files[0];
};

const handleFileChangeFicha = (event) => {
  imgFicha.value = event.target.files[0];
};

const handleFileChangeCarta = (event) => {
  imgCarta.value = event.target.files[0];
};

const codigoBloqueImg = ref("");
const actualizarImagenes = async () => {
  if (!imgEstudiante.value && !imgCarta.value && !imgFicha.value) {
    return Swal.fire({
      title: "Sin Imágenes",
      text: `No hay imágenes cargadas.`,
      icon: "warning",
      footer: "Por favor, cargue las imagenes.",
    });
  }
  if (!codigoBloqueImg.value) {
    return Swal.fire({
      title: "Sin Bloque",
      text: `Sin bloque seleccionado.`,
      icon: "warning",
      footer: "Por favor, seleccione un bloque.",
    });
  }

  deshabilitarComponentes.value = true;
  const formDataImagenes = new FormData();
  formDataImagenes.append("ImgEstudiante", imgEstudiante.value);
  formDataImagenes.append("ImgFicha", imgFicha.value);
  formDataImagenes.append("ImgCarta", imgCarta.value);
  try {
    if (!authStore.token) {
      return alert("No estás autorizado para realizar esta acción.");
    }

    const headers = {
      Authorization: `Bearer ${authStore.token}`,
    };

    const response = await fetch(
      `${baseApiBackend}/api/fichacalificacion/actualizarImagenesBloque/${codigoBloqueImg.value}`,
      {
        method: "PUT",
        body: formDataImagenes,
        headers,
      }
    );

    if (response.ok) {
      Swal.fire({
        title: "¡Actualizado!",
        text: `Las imágenes se han actualizado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      imgEstudiante.value = "";
      imgFicha.value = "";
      imgCarta.value = "";
    } else {
      Swal.fire({
        title: "Error",
        text: `Hubo un error al intentar actualizar las imágenes.`,
        icon: "error",
        footer: "Por favor, intente nuevamente más tarde.",
      });
    }
    deshabilitarComponentes.value = false;
  } catch (error) {
    deshabilitarComponentes.value = false;
    Swal.fire({
      title: "Error",
      text: `Hubo un error al intentar actualizar las imágenes.`,
      icon: "error",
      footer: "Por favor, intente nuevamente más tarde.",
    });
  }
};

//#endregion
</script>
<style scoped>
.contenedor-primario {
  margin-top: 60px;
  margin-left: 25px;
}

.listaFiltro {
  position: absolute;
  z-index: 1;
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* border: 1px solid #ccc; */
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #454545;
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.listaFiltro li {
  padding: 7px;
  cursor: pointer;
}

.listaFiltro li:hover {
  background-color: #808080;
  color: #fff;
}
</style>
