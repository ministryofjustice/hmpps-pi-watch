{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
  };

  outputs = { self, nixpkgs, ... }@inputs: {

    devShell = {
      x86_64-darwin =
        let
          pkgs = nixpkgs.legacyPackages.x86_64-darwin;
        in
        pkgs.mkShell {
          buildInputs = with pkgs; [
            helm
            nodejs
          ];
        };
    };
  };
}
