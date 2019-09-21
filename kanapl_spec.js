/**
 * KANAPL
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
/*
 * This test case is described for Jasmine.
 */
describe("KANAPL", function () {
    function ok(env, program, expected) {
        var result = env.eval(program);

        expect(result).toEqual(expected);
    }

    beforeEach(function () {
    });

    describe("scalar functions", function () {
        it("rho", function() {
            var env = KANAPL();

            ok(env, "2 3ρ1 2 3 4 5 6", [[1, 2, 3], [4, 5, 6]]);
            ok(env, "2 3ρ1", [[1, 1, 1], [1, 1, 1]]);
            ok(env, "2 3ρ1 2 3 4", [[1, 2, 3], [4, 1, 2]]);
            ok(env, "2 3 2ρ1 2 3", [[[1, 2], [3, 1], [2, 3]], [[1, 2], [3, 1], [2, 3]]]);
            ok(env, "5ρ1 2 3", [1, 2, 3, 1, 2]);
            ok(env, "5ρ1", [1, 1, 1, 1, 1]);
        });

        it("addition", function () {
            var env = KANAPL();

            ok(env, "2+3", 5);
            ok(env, "2+1 2 3 4", [3, 4, 5, 6]);
            ok(env, "1 2 3 4+2", [3, 4, 5, 6]);
            ok(env, "2+2 3ρ1 2 3 4 5 6", [[3, 4, 5], [6, 7, 8]]);
            ok(env, "(1 2 3 4)+2 3 4 5", [3, 5, 7, 9]);
            ok(env, "(2 3ρ2 3 4 5 6 7)+2 3ρ1 2 3 4 5 6", [[3, 5, 7], [9, 11, 13]]);
        });

        it("subtraction", function () {
            var env = KANAPL();

            ok(env, "2-3", -1);
            ok(env, "2-1 2 3 4", [1, 0, -1, -2]);
            ok(env, "1 2 3 4-2", [-1, 0, 1, 2]);
            ok(env, "2-2 3ρ1 2 3 4 5 6", [[1, 0, -1], [-2, -3, -4]]);
            ok(env, "(1 2 3 4)-2 3 4 5", [-1, -1, -1, -1]);
            ok(env, "(2 3ρ2 3 4 5 6 7)-2 3ρ1 2 3 4 5 6", [[1, 1, 1], [1, 1, 1]]);
        });

        it("multiplication", function () {
            var env = KANAPL();

            ok(env, "2×3", 6);
            ok(env, "2×1 2 3 4", [2, 4, 6, 8]);
            ok(env, "1 2 3 4×2", [2, 4, 6, 8]);
            ok(env, "2×2 3ρ1 2 3 4 5 6", [[2, 4, 6], [8, 10, 12]]);
            ok(env, "(1 2 3 4)×2 3 4 5", [2, 6, 12, 20]);
            ok(env, "(2 3ρ2 3 4 5 6 7)×2 3ρ1 2 3 4 5 6", [[2, 6, 12], [20, 30, 42]]);
        });

        it("division", function () {
            var env = KANAPL();

            ok(env, "3÷2", 1.5);
            ok(env, "2÷1 2 4 8", [2, 1, 0.5, 0.25]);
            ok(env, "1 2 3 4÷2", [0.5, 1, 1.5, 2]);
            ok(env, "(2 3ρ1 2 3 4 5 6)÷2", [[0.5, 1, 1.5], [2, 2.5, 3]]);
            ok(env, "(1 2 3 4)÷2 4 2 4", [0.5, 0.5, 1.5, 1]);
            ok(env, "(2 3ρ1 2 3 4 5 6)÷2 3ρ1 2 3 4 5 6", [[1, 1, 1], [1, 1, 1]]);
        });

        it("negate", function() {
            var env = KANAPL();

            ok(env, "-2", -2);
            ok(env, "-1 2 3 4", [-1, -2, -3, -4]);
            ok(env, "-2 3ρ1 2 3 4 5 6", [[-1, -2, -3], [-4, -5, -6]]);
        });

        it("signum", function() {
            var env = KANAPL();

            ok(env, "×2", 1);
            ok(env, "×2 0 ￣2", [1, 0, -1]);
            ok(env, "×2 3ρ2 2 0 ￣2 2 3", [[1, 1, 0], [-1, 1, 1]]);
        });

        it("invertion", function() {
            var env = KANAPL();

            ok(env, "÷2", 0.5);
            ok(env, "÷1 2 4", [1, 0.5, 0.25]);
            ok(env, "÷2 3ρ1 2 4", [[1, 0.5, 0.25], [1, 0.5, 0.25]]);
        });

        it("modulo", function() {
            var env = KANAPL();

            ok(env, "3|4", 1);
            ok(env, "3|2 3 ￣4 ￣5", [2, 0, 2, 1]);
            ok(env, "￣3|4 ￣5", [-2, -2]);
            ok(env, "(2 3 4 5)|3", [1, 0, 3, 3]);
            ok(env, "3|2 3ρ3 4 5", [[0, 1, 2], [0, 1, 2]]);
            ok(env, "(2 3 4 5)|3 4 5 6", [1, 1, 1, 1]);
            ok(env, "(2 3ρ1 2 3 4 5 6)|2 3ρ2 3 4 5 6 6.5", [[0, 1, 1], [1, 1, 0.5]]);
        });

        it("absolute value", function() {
            var env = KANAPL();

            ok(env, "|2", 2);
            ok(env, "|2 0 ￣2 1", [2, 0, 2, 1]);
            ok(env, "|2 3ρ2 0 ￣2", [[2, 0, 2], [2, 0, 2]]);
        });

        it("maximum", function() {
            var env = KANAPL();

            ok(env, "2「3", 3);
            ok(env, "2「1 2 3", [2, 2, 3]);
            ok(env, "1 2 4「3", [3, 3, 4]);
            ok(env, "(1 3 4 5)「2 2 3 6", [2, 3, 4, 6]);
            ok(env, "3「2 3ρ1 3 4", [[3, 3, 4], [3, 3, 4]]);
            ok(env, "(2 3ρ1 2 3)「2 3ρ3 2 1", [[3, 2, 3], [3, 2, 3]]);
        });

        it("minimum", function() {
            var env = KANAPL();

            ok(env, "2」3", 2);
            ok(env, "2」1 2 3", [1, 2, 2]);
            ok(env, "1 2 3」2", [1, 2, 2]);
            ok(env, "(1 3 4 5)」2 2 3 4", [1, 2, 3, 4]);
            ok(env, "3」2 3ρ1 3 4", [[1, 3, 3], [1, 3, 3]]);
            ok(env, "(2 3ρ1 2 3)」2 3ρ3 2 1", [[1, 2, 1], [1, 2, 1]]);
        });

        it("ceiling", function() {
            var env = KANAPL();

            ok(env, "「3.4", 4);
            ok(env, "「2.3 2.5 2.7 3 ￣2.7 ￣2", [3, 3, 3, 3, -2, -2]);
            ok(env, "「2 3ρ1.2 1.4 1.6", [[2, 2, 2], [2, 2, 2]]);
        });

        it("floor", function() {
            var env = KANAPL();

            ok(env, "」3.4", 3);
            ok(env, "」2.3 2.5 2.7 2 ￣2.7 ￣2", [2, 2, 2, 2, -3, -2]);
            ok(env, "」2 3ρ1.2 1.4 1.6", [[1, 1, 1], [1, 1, 1]]);
        });

        it("power", function() {
            var env = KANAPL();

            ok(env, "2★3", 8);
            ok(env, "2★1 2 3", [2, 4, 8]);
            ok(env, "2★0 ￣1 ￣2 ￣3", [1, 0.5, 0.25, 0.125]);
            ok(env, "￣2★1 2 3", [-2, 4, -8]);
            ok(env, "￣2★0 ￣1 ￣2 ￣3", [1, -0.5, 0.25, -0.125]);
            ok(env, "(2 2.5 3)★3", [8, Math.pow(2.5, 3), 27]);
            ok(env, "(1 2 3)★(2 3 4)", [1, 8, 81]);
            ok(env, "(2 3ρ1 2 3)★(2 3ρ1 2 3)", [[1, 4, 27], [1, 4, 27]]);
        });

        it("exp", function() {
            var env = KANAPL();

            ok(env, "★1", Math.E);
            ok(env, "★1 ￣1 0", [Math.E, Math.exp(-1), 1]);
            ok(env, "★2 3ρ1 2 3", [[Math.E, Math.exp(2), Math.exp(3)], [Math.E, Math.exp(2), Math.exp(3)]]);
        });

        it("logn", function() {
            var env = KANAPL();

            ok(env, "2☆8", 3);
            ok(env, "2☆1 2 4", [0, 1, 2]);
            ok(env, "(2 4 16)☆16", [4, 2, 1]);
            ok(env, "(2 4 16)☆4 16 256", [2, 2, 2]);
            ok(env, "(2 3ρ2 4 16)☆2 3ρ4 16 256", [[2, 2, 2], [2, 2, 2]]);
        });

        it("log", function() {
            var env = KANAPL();

            ok(env, "☆2", Math.log(2));
            ok(env, "☆2 3 4", [Math.log(2), Math.log(3), Math.log(4)]);
            ok(env, "☆2 3ρ2 3 4", [[Math.log(2), Math.log(3), Math.log(4)], [Math.log(2), Math.log(3), Math.log(4)]]);
        });

        it("trigonometric functions", function() {
            var env = KANAPL();

            ok(env, "0〇1 0.5 0", [0, Math.sqrt(0.75), 1]);
            ok(env, "1〇1", Math.sin(1));
            ok(env, "2〇1", Math.cos(1));
            ok(env, "3〇1", Math.tan(1));
            ok(env, "4〇1", Math.sqrt(2));
            ok(env, "5〇1", Math.sinh(1));
            ok(env, "6〇1", Math.cosh(1));
            ok(env, "7〇1", Math.tanh(1));
            ok(env, "￣1〇￣1 0.5 1", [Math.asin(-1), Math.asin(0.5), Math.asin(1)]);
            ok(env, "￣2〇￣1 0.5 1", [Math.acos(-1), Math.acos(0.5), Math.acos(1)]);
            ok(env, "￣3〇1", Math.atan(1));
            ok(env, "￣4〇1 2", [0, Math.sqrt(3)]);
            ok(env, "￣5〇1 2", [Math.asinh(1), Math.asinh(2)]);
            ok(env, "￣6〇1 2", [Math.acosh(1), Math.acosh(2)]);
            ok(env, "￣7〇1 2", [Math.atanh(1), Math.atanh(2)]);
            ok(env, "1〇1 1 1", [Math.sin(1), Math.sin(1), Math.sin(1)]);
            ok(env, "1〇2 3ρ1 1 1", [[Math.sin(1), Math.sin(1), Math.sin(1)], [Math.sin(1), Math.sin(1), Math.sin(1)]]);
        });

        it("pi", function() {
            var env = KANAPL();

            ok(env, "〇2", 2 * Math.PI);
            ok(env, "〇2 3 4", [2 * Math.PI, 3 * Math.PI, 4 * Math.PI]);
            ok(env, "〇2 3ρ2 3 4", [[2 * Math.PI, 3 * Math.PI, 4 * Math.PI], [2 * Math.PI, 3 * Math.PI, 4 * Math.PI]]);
        });

        it("factorial", function() {
            var env = KANAPL();

            ok(env, "!3", 6);
            ok(env, "!￣1.4 0 0.4 1 1.4 2.4", [-3.7229806220320456, 1, 0.8872638175030746, 1, 1.2421693445043056, 2.9812064268103313]);
            ok(env, "!2 3ρ0 1 4", [[1, 1, 24], [1, 1, 24]]);
        });

        it("combination", function() {
            var env = KANAPL();

            ok(env, "2!3", 3);
            ok(env, "2!3 4 5", [3, 6, 10]);
            ok(env, "0 1 2 3!3", [1, 3, 3, 1]);
            ok(env, "(0 1 2)!3 4 5", [1, 4, 10]);
            ok(env, "(2 3ρ0 1 2)!2 3ρ3 4 5", [[1, 4, 10], [1, 4, 10]]);
        });

        it("relation", function() {
            var env = KANAPL();

            ok(env, "3<4", 1);
            ok(env, "3>4", 0);
            ok(env, "3≦4", 1);
            ok(env, "3≧4", 0);
            ok(env, "3=4", 0);
            ok(env, "3≠4", 1);
            ok(env, "3<2 3 4", [0, 0, 1]);
            ok(env, "3>2 3 4", [1, 0, 0]);
            ok(env, "3≦2 3 4", [0, 1, 1]);
            ok(env, "3≧2 3 4", [1, 1, 0]);
            ok(env, "3=2 3 4", [0, 1, 0]);
            ok(env, "3≠2 3 4", [1, 0, 1]);
            ok(env, "2 3 4<4", [1, 1, 0]);
            ok(env, "2 3 4>4", [0, 0, 0]);
            ok(env, "2 3 4≦4", [1, 1, 1]);
            ok(env, "2 3 4≧4", [0, 0, 1]);
            ok(env, "2 3 4=4", [0, 0, 1]);
            ok(env, "2 3 4≠4", [1, 1, 0]);
            ok(env, "2 3 4<4 3 2", [1, 0, 0]);
            ok(env, "2 3 4>4 3 2", [0, 0, 1]);
            ok(env, "2 3 4≦4 3 2", [1, 1, 0]);
            ok(env, "2 3 4≧4 3 2", [0, 1, 1]);
            ok(env, "2 3 4=4 3 2", [0, 1, 0]);
            ok(env, "2 3 4≠4 3 2", [1, 0, 1]);
            ok(env, "(2 3ρ2 3 4)<2 3ρ4 3 2", [[1, 0, 0], [1, 0, 0]]);
            ok(env, "(2 3ρ2 3 4)>2 3ρ4 3 2", [[0, 0, 1], [0, 0, 1]]);
            ok(env, "(2 3ρ2 3 4)≦2 3ρ4 3 2", [[1, 1, 0], [1, 1, 0]]);
            ok(env, "(2 3ρ2 3 4)≧2 3ρ4 3 2", [[0, 1, 1], [0, 1, 1]]);
            ok(env, "(2 3ρ2 3 4)=2 3ρ4 3 2", [[0, 1, 0], [0, 1, 0]]);
            ok(env, "(2 3ρ2 3 4)≠2 3ρ4 3 2", [[1, 0, 1], [1, 0, 1]]);
            ok(env, "'Nina'='Hina'", [0, 1, 1, 1]);
            ok(env, "'Nina'≠'Hina'", [1, 0, 0, 0]);
        });

        it("logical function", function() {
            var env = KANAPL();

            ok(env, "2∧3", 1);
            ok(env, "2∨3", 1);
            ok(env, "2†3", 0);
            ok(env, "2‡3", 0);
            ok(env, "2∧3 0", [1, 0]);
            ok(env, "2∨3 0", [1, 1]);
            ok(env, "2†3 0", [0, 1]);
            ok(env, "2‡3 0", [0, 0]);
            ok(env, "(2 0)∧3", [1, 0]);
            ok(env, "(2 0)∨3", [1, 1]);
            ok(env, "(2 0)†3", [0, 1]);
            ok(env, "(2 0)‡3", [0, 0]);
            ok(env, "(2 2 0 0)∧3 0 3 0", [1, 0, 0, 0]);
            ok(env, "(2 2 0 0)∨3 0 3 0", [1, 1, 1, 0]);
            ok(env, "(2 2 0 0)†3 0 3 0", [0, 1, 1, 1]);
            ok(env, "(2 2 0 0)‡3 0 3 0", [0, 0, 0, 1]);
            ok(env, "(2 4ρ2 2 0 0)∧2 4ρ3 0 3 0", [[1, 0, 0, 0], [1, 0, 0, 0]]);
            ok(env, "(2 4ρ2 2 0 0)∨2 4ρ3 0 3 0", [[1, 1, 1, 0], [1, 1, 1, 0]]);
            ok(env, "(2 4ρ2 2 0 0)†2 4ρ3 0 3 0", [[0, 1, 1, 1], [0, 1, 1, 1]]);
            ok(env, "(2 4ρ2 2 0 0)‡2 4ρ3 0 3 0", [[0, 0, 0, 1], [0, 0, 0, 1]]);
        });

        it("logical not", function() {
            var env = KANAPL();

            ok(env, "~3", 0);
            ok(env, "~2 0 1", [0, 1, 0]);
            ok(env, "~2 3ρ2 0 1", [[0, 1, 0], [0, 1, 0]]);
        });
    });

    describe("compound operators", function () {
        it("reduce", function() {
            var env = KANAPL();

            ok(env, "+/1 2 3", 6);
            ok(env, "-/1 2 3", -4);
            ok(env, "×/1 2 3", 6);
            ok(env, "÷/1 2 4", 0.125);
            ok(env, "|/2 3 4", 0);
            ok(env, "「/2 8 3", 8);
            ok(env, "」/2 8 3", 2);
            ok(env, "★/2 2 3", 64);
            ok(env, "〇/1 2", Math.sin(2));
            ok(env, "☆/10 1000 3", 1);
            ok(env, "!/2 3", 3);
            ok(env, "∧/2 0 3", 0);
            ok(env, "∨/2 0 3", 1);
            ok(env, "†/2 0 3", 0);
            ok(env, "‡/2 0 3", 0);
            ok(env, "</1 2 3", 1);
            ok(env, "≦/1 2 3", 1);
            ok(env, ">/1 2 3", 0);
            ok(env, "≧/1 2 3", 0);
            ok(env, "=/1 2 3", 0);
            ok(env, "≠/1 2 3", 1);
            ok(env, "-/2", 2);
            ok(env, "+/2 3ρ1 2 3 4 5 6", [6, 15]);
            ok(env, "+/[1]2 3ρ1 2 3 4 5 6", [5, 7, 9]);
            ok(env, "+/[2]2 3 2ρ1 2 3 4", [[5, 8], [7, 10]]);
        });

        it("scan", function() {
            var env = KANAPL();

            ok(env, "+\\1 2 3", [1, 3, 6]);
            ok(env, "-\\1 2 3", [1, -1, -4]);
            ok(env, "×\\1 2 3", [1, 2, 6]);
            ok(env, "÷\\1 2 4", [1, 0.5, 0.125]);
            ok(env, "|\\2 3 4", [2, 1, 0]);
            ok(env, "「\\2 8 3", [2, 8, 8]);
            ok(env, "」\\2 8 3", [2, 2, 2]);
            ok(env, "★\\2 2 3", [2, 4, 64]);
            ok(env, "〇\\1 2", [1, Math.sin(2)]);
            ok(env, "☆\\10 10000 4", [10, 4, 1]);
            ok(env, "!\\2 3", [2, 3]);
            ok(env, "∧\\2 0 3", [2, 0, 0]);
            ok(env, "∨\\2 0 3", [2, 1, 1]);
            ok(env, "†\\2 0 3", [2, 1, 0]);
            ok(env, "‡\\2 0 3", [2, 0, 0]);
            ok(env, "<\\1 2 3", [1, 1, 1]);
            ok(env, "≦\\1 2 3", [1, 1, 1]);
            ok(env, ">\\1 2 3", [1, 0, 0]);
            ok(env, "≧\\1 2 3", [1, 0, 0]);
            ok(env, "=\\1 2 3", [1, 0, 0]);
            ok(env, "≠\\1 2 3", [1, 1, 1]);
            ok(env, "-\\2", 2);
            ok(env, "+\\2 3ρ1 2 3 4 5 6", [[1, 3, 6], [4, 9, 15]]);
            ok(env, "+\\[1]2 3ρ1 2 3 4 5 6", [[1, 2, 3], [5, 7, 9]]);
            ok(env, "+\\[2]2 3 2ρ1 2 3 4", [[[1, 2], [4, 6], [5, 8]], [[3, 4], [4, 6], [7, 10]]]);
        });

        it("inner product", function() {
            var env = KANAPL();

            ok(env, "1 2 3+.+1 2 3", 12);
            ok(env, "1 2 3+.-2 3 4", -3);
            ok(env, "1 2 3+.×1 2 3", 14);
            ok(env, "2 4 6+.÷2 2 3", 5);
            ok(env, "2 3 4+.|1 2 3", 6);
            ok(env, "2 8 3+.「3 4 6", 17);
            ok(env, "2 8 3+.」3 4 6", 9);
            ok(env, "1 2 3+.★3 2 1", 8);
            ok(env, "1 2+.〇1 2", Math.sin(1) + Math.cos(2));
            ok(env, "2 4 8+.☆4 16 64", 6);
            ok(env, "2 3+.!3 4", 7);
            ok(env, "1 2 3+.∧2 0 3", 2);
            ok(env, "1 2 3+.∨2 0 3", 3);
            ok(env, "1 2 3+.†2 0 3", 1);
            ok(env, "1 2 3+.‡2 0 3", 0);
            ok(env, "2 8 3+.<3 4 6", 2);
            ok(env, "2 8 3+.≦3 4 6", 2);
            ok(env, "2 8 3+.>3 4 6", 1);
            ok(env, "2 8 3+.≧3 4 6", 1);
            ok(env, "'Nina'+.='Hina'", 3);
            ok(env, "'Nina'+.≠'Hina'", 1);
            ok(env, "1 2 3-.+1 2 3", -8);
            ok(env, "1 2 3×.+1 2 3", 48);
            ok(env, "8 4 2÷.+8 4 2", 0.5);
            ok(env, "2 3|.+1 2", 2);
            ok(env, "2 8 3「.+3 4 6", 12);
            ok(env, "2 8 3」.+3 4 6", 5);
            ok(env, "1 2★.+1 2", 16);
            ok(env, "1 2〇.+1 2", Math.cos(4));
            ok(env, "6 6000☆.+4 4000", 4);
            ok(env, "1 2!.+1 2", 6);
            ok(env, "1 2 3∧.+3 2 1", 1);
            ok(env, "2 8 3∨.+3 4 6", 1);
            ok(env, "1 2 3†.+3 2 1", 1);
            ok(env, "2 8 3‡.+3 4 6", 0);
            ok(env, "2 8 3<.+3 4 6", 1);
            ok(env, "2 8 3≦.+3 4 6", 1);
            ok(env, "2 8 3>.+3 4 6", 0);
            ok(env, "2 8 3≧.+3 4 6", 0);
            ok(env, "2 8 3=.+3 4 6", 0);
            ok(env, "2 8 3≠.+3 4 6", 1);
            ok(env, "1+.+2", 3);
            ok(env, "2+.×1 2 3", 12);
            ok(env, "1 2 3-.×2", -8);
            ok(env, "(2 2ρ1 2 3 4)+.×2 2ρ1 1 1 0", [[3, 1], [7, 3]]);
            ok(env, "(3 2ρ2 3 4)+.×2 3 2ρ2 3 4", [[[10, 15], [20, 10], [15, 20]], [[12, 18], [24, 12], [18, 24]], [[14, 21], [28, 14], [21, 28]]]);
        });
    });
});
