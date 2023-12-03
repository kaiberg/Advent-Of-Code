val numberPattern = Regex("[0-9]+")
val specialPattern = Regex("[^0-9.]")
var list: MutableList<List<List<MatchResult>>> = mutableListOf()

fun main(args: Array<String>) {

    Part1()
    list = mutableListOf()
    Part2()
}