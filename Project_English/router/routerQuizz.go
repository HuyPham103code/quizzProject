package router
import(
	"golang-fiber/quizz"
	"github.com/gofiber/fiber/v2"
)
//rest api
func setupQuizz(app *fiber.App){
	app.Get("/quizz", quizz.GetAll)
	app.Post("/quizz", quizz.Post)
	app.Delete("/quizz/:id", quizz.Delete)
	app.Put("/quizz/:id", quizz.Update)
}