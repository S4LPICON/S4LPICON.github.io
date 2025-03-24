document.addEventListener("DOMContentLoaded", function () {
    // Definir el Toolbox con categorías personalizadas
    const toolbox = `
        <xml>
            <category name="Lógica" colour="210">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
            </category>
            <category name="Matemáticas" colour="230">
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
            </category>
            <category name="Texto" colour="160">
                <block type="text"></block>
                <block type="text_print"></block>
            </category>
            <category name="Minecraft" colour="120">
                <block type="mc_send_chat"></block>
                <block type="mc_spawn_entity"></block>
                <block type="mc_select_animal_and_vector"></block>
            </category>
        </xml>
    `;

    // Inicializar Blockly con el toolbox personalizado
    const workspace = Blockly.inject("blocklyDiv", { toolbox: toolbox });

    // Botón para ejecutar el código generado
    document.getElementById("runCode").addEventListener("click", function () {
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        document.getElementById("codeOutput").textContent = code;
    });
});

// ======================== BLOQUES PERSONALIZADOS ========================

// Bloque para enviar un mensaje al chat de Minecraft
Blockly.Blocks["mc_send_chat"] = {
    init: function () {
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("Enviar mensaje:");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Envía un mensaje al chat en Minecraft.");
    },
};

// Código JavaScript para el bloque "mc_send_chat"
Blockly.JavaScript["mc_send_chat"] = function (block) {
    var message = Blockly.JavaScript.valueToCode(block, "MESSAGE", Blockly.JavaScript.ORDER_ATOMIC);
    return `console.log("Minecraft Chat: " + ${message});\n`;
};


// Bloque para generar una entidad en Minecraft
Blockly.Blocks["mc_spawn_entity"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Generar entidad")
            .appendField(new Blockly.FieldDropdown([
                ["Zombie", "ZOMBIE"],
                ["Vaca", "COW"],
                ["Creeper", "CREEPER"],
                ["Pollo", "Chicken"]
            ]), "ENTITY");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Genera una entidad en Minecraft.");
    },
};

// Código JavaScript para el bloque "mc_spawn_entity"
Blockly.JavaScript["mc_spawn_entity"] = function (block) {
    var entity = block.getFieldValue("ENTITY");
    return `console.log("Spawn entidad: ${entity}");\n`;
};

// Bloque para seleccionar un animal y un vector de 3 posiciones
Blockly.Blocks["mc_select_animal_and_vector"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Seleccionar animal")
            .appendField(new Blockly.FieldDropdown([
                ["Gato", "CAT"],
                ["Perro", "DOG"]
            ]), "ANIMAL");
        this.appendValueInput("VECTOR_X")
            .setCheck("Number")
            .appendField("Vector X");
        this.appendValueInput("VECTOR_Y")
            .setCheck("Number")
            .appendField("Y");
        this.appendValueInput("VECTOR_Z")
            .setCheck("Number")
            .appendField("Z");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Selecciona un animal y un vector de 3 posiciones.");
    },
};

// Código JavaScript para el bloque "mc_select_animal_and_vector"
Blockly.JavaScript["mc_select_animal_and_vector"] = function (block) {
    var animal = block.getFieldValue("ANIMAL");
    var vectorX = Blockly.JavaScript.valueToCode(block, "VECTOR_X", Blockly.JavaScript.ORDER_ATOMIC);
    var vectorY = Blockly.JavaScript.valueToCode(block, "VECTOR_Y", Blockly.JavaScript.ORDER_ATOMIC);
    var vectorZ = Blockly.JavaScript.valueToCode(block, "VECTOR_Z", Blockly.JavaScript.ORDER_ATOMIC);
    return `console.log("Animal: ${animal}, Vector: [" + ${vectorX} + ", " + ${vectorY} + ", " + ${vectorZ} + "]");\n`;
};
